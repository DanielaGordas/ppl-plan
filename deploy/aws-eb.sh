#!/bin/bash
# A simple deployment script for Elastic Beanstalk to get the test or production environment up and running.

# The production environment uses a load balancer rather than single instance install,
# plus the database has been set up separately from the Beanstalk configuration, so that it
# will persist if the EB environment is terminated for any reason.
# RDS database was created separately, by hand, with appropriate security groups.
# For production a gpg key is required to decrypt the production-envs.sh file, which contains
# all the private environment variables required to run.

EB_PROFILE=ppl-plan

EB_PLATFORM="ruby-2.6"

SERVERSIZE=t2.micro

SETUP_DEV=${SETUP_DEV:=false}

function setup_deploy_env() {
  if [ "${SETUP_DEV}" == 'true' ]; then
    EB_ENV=ppl-plan
  else
    EB_ENV=ppl-plan-prod
  fi
}

function setup_env_vars() {
  if [ "${SETUP_DEV}" == 'true' ]; then
    # These are development settings only. Do not use in production
    echo "Deploying to development"
    EB_ENV=ppl-plan
    SECRET_KEY_BASE=T3n9PxP%qeX$q%x!rh9jmmt43MFf@NY$G5PpAimS!6gEg!o@2boutoKf@8yPrFg
    RDS_DB_NAME=ppl_plan
    RDS_USERNAME=ebdb
    RDS_PASSWORD=test-ebrails-password
    RDS_HOSTNAME=
    ENV_FLAGS="-p ${EB_PLATFORM}"
    DEV_FLAGS="-s -db -db.engine postgres -db.user ${RDS_USERNAME} -db.pass ${RDS_PASSWORD}"
  else
    echo "Deploying to production. Provide gpg key to unlock production secrets."
    gpg deploy/production-vars.sh.gpg

    if [ ! -f deploy/production-vars.sh ]; then
      echo 'production-vars.sh was not decrypted. Incorrect gpg key used?'
      exit 5
    fi

    source deploy/production-vars.sh
    rm -f deploy/production-vars.sh

    EB_ENV=ppl-plan-prod
    ENV_FLAGS="-p ${EB_PLATFORM} --scale 2 -pr --vpc.publicip"
    ENV_FLAGS="${ENV_FLAGS} --vpc.id vpc-0ae947ca3485d3fb0 --vpc.securitygroups sg-0a38b3e8689f621ef"
    ENV_FLAGS="${ENV_FLAGS} --vpc.ec2subnets subnet-0259f8e1ab3f8482d,subnet-0e28cb8715f47a3ed"
    ENV_FLAGS="${ENV_FLAGS} --vpc.dbsubnets subnet-0ca858a5a97e7b9f4,subnet-06ce1cab0ec6db9d6,subnet-0e28cb8715f47a3ed,subnet-0259f8e1ab3f8482d"
    ENV_FLAGS="${ENV_FLAGS} --vpc.elbpublic --vpc.elbsubnets subnet-0f6f49ad3067f7d95,subnet-0f9212ad3ec233590"
  fi
}

function check_aws_credentials() {

  got_profile=$(grep 'profile ppl-plan' ~/.aws/config)
  if [ ! "${got_profile}" ]; then
    echo "The AWS CLI config and credentials were not set up for ${EB_PROFILE}. The config has now been created."
    echo "Configure credentials in ~/.aws/credentials for '${EB_PROFILE}' before continuing"

    echo "Edit ~/.aws/credentials then re run this deployment."
    cat >> ~/.aws/config << EOF

[profile ppl-plan]
region = eu-west-2
output = json

EOF

    cat >> ~/.aws/credentials << EOF

[ppl-plan]
aws_access_key_id =  ???
aws_secret_access_key = ???

EOF

    exit 2
  fi

}

echo "Yarn build and deploy"
git fetch origin release
git checkout release
git pull

if [ "$?" != 0 ]; then
  echo "'git checkout release' failed to checkout release branch"
  exit 7
fi

git merge -X theirs master

if [ "$?" != 0 ]; then
  echo "'git merge master' failed "
  exit 9
fi

yarn build && yarn deploy

if [ ! -d public/static ]; then
  echo 'static directory does not exist'
  exit 8
fi

git add -f public
git commit -a -m "Build yarn for deployment"
git push -f

check_aws_credentials

setup_deploy_env
eb status ${EB_ENV} --profile ${EB_PROFILE}

if [ "$?" == 4 ]; then
  echo "The EB environment has not been set up. Starting the configuration"

  setup_env_vars create

  eb create ${EB_ENV} \
    --profile ${EB_PROFILE} ${DEV_FLAGS} ${ENV_FLAGS} \
    --instance_type=${SERVERSIZE} \
    --envvars RAILS_SERVE_STATIC_FILES=true,BUNDLER_DEPLOYMENT_MODE=true,BUNDLE_WITHOUT=test:development,RACK_ENV=production,RAILS_ENV=production,RAILS_SKIP_ASSET_COMPILATION=false,RAILS_SKIP_MIGRATIONS=false,RDS_DB_NAME=${RDS_DB_NAME},RDS_HOSTNAME=${RDS_HOSTNAME},RDS_PASSWORD=${RDS_PASSWORD},RDS_PORT=5432,RDS_USERNAME=${RDS_USERNAME},SECRET_KEY_BASE=${SECRET_KEY_BASE}

else
  eb deploy ${EB_ENV} --profile ${EB_PROFILE}
fi

git checkout master

echo "Deployed. You are back on the master branch"
