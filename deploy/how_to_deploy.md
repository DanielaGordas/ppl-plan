# How to Deploy 

To get started, merge changes into the *master* branch that you want to deploy.

The script `deploy/aws-eb.sh` should do most of the set up of the Elastic Beanstalk environment. Run the script.

The script should ensure you have have AWS credentials set up. It will put in skeleton 
entries into `~/.aws/config` and `~/.aws/credentials` which you will need to edit with your own AWS keys.

The script merges *master* into a branch called *release*, builds the yarn components locally and deploys the app. 

If the environment doesn't exist, it creates it, but every time going forward unless you have 
changed the name of the environment in the app it will deploy the new version. 

If creating a new app, the script will prompt for a GPG key to get the app secrets in the production-env.sh file, setting up a
minimal set of environment variables to allow the app to run and database to be connected to. Other variables can be added,
or you will have to rely on keeping the environment on Elastic Beanstalk up to date.
