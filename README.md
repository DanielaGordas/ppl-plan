## THE PEOPLE'S PLAN GAMIFIED MOBILE SURVEY

The project was built for the [Climate Venture Collective](https://thecvcollective.com/), a global collaborative community finding innovative solutions to the climate crisis. The main goal of the app is to use gamification to inform and engage people on climate related policies.

This project is made of a Ruby on Rails API backend and a React front-end.

## Backend app

* Ruby 2.6.6
* Rails 6.0.3
* PostgreSQL

From the main directory run the following commands to setup the development environment:

### `bundle install`

### `yarn install`

Installs gems and dependencies

### `rails db:create db:migrate db:seed`

Creates the database, adds the tables and populates it with data

### `rails s -p 3001`

Starts the backend development server

Open [http://localhost:3001](http://localhost:3001) to view it in the browser.<br />
To view the backend data you need to add the api endpoint e.g: [http://localhost:3001/api/answers](http://localhost:3001/api/answers)

## Frontend app

Designed for mobile first and bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

* React 16.13.1
* Sass
* [React DND](https://react-dnd.github.io/react-dnd/docs/overview)

### `yarn --cwd client start`

Starts the frontend development server

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Deployment to Elastic Beanstalk

See [deploy/how_to_deploy.md](deploy/how_to_deploy.md)

## Run Rails console commands on Elastic Beanstalk command line

Use `eb ssh` to access the command line. You will be logged in as the user **ec2-user**. Alternatively, access the
SSH console through the EC2 instance *Connect* menu.

Get a root shell:

    sudo -i

Start the Rails console:

    # Set up the environment variables for DB access
    efile=$(mktemp); for l in $(cat /opt/elasticbeanstalk/deployment/env); do echo "export ${l}" >> ${efile}; done
    # Run as the same user that runs the app server
    sudo -u webapp bash -c "source ${efile}; rails console" 

Complete your command line requirements, then exit. Now clean up the environment variables

    rm -f ${efile}
