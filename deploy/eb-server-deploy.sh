#!/bin/bash
# Run with deploy/eb-server-deploy.sh to set up yarn and build the components

npm install --global yarn
/opt/elasticbeanstalk/support/node-install/node-v12.16.0-linux-x64/bin/yarn react-router-dom
/opt/elasticbeanstalk/support/node-install/node-v12.16.0-linux-x64/bin/yarn build
