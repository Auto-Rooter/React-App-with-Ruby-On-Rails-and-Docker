# React-Rails-App-MySQL-RSpec-Docker [![CircleCI](https://circleci.com/gh/Auto-Rooter/React-App-with-Ruby-On-Rails-and-Docker/tree/master.svg?style=svg)](https://circleci.com/gh/Auto-Rooter/React-App-with-Ruby-On-Rails-and-Docker/tree/master)

## Welcome in the Backend side 😉:

## Usage

```shell
$ git clone https://github.com/Auto-Rooter/React-App-with-Ruby-On-Rails-and-Docker.git && cd React-App-with-Ruby-On-Rails-and-Docker

# Setup
$ docker-compose run web rake db:create
$ docker-compose run web rake db:migrate
$ docker-compose run web rake db:seed

# Start
$ docker-compose up 
$ open http://localhost:3000
```