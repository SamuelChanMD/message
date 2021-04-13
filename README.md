# Description

An application which stores messages and computes whether or not the message is a palindrome. Application is containerized in Docker as is the database, in this case Postgresql.

There are five endpoints:
- POST api/message: Accepts JSON body containing "value" which is the string message and inserts it into db along with whether it is a palindrome or not
- GET api/message/:id: Returns full message record with said ID
- GET api/messages: Return list of all messages
- PATCH api/message/:id: Accepts JSON body containing "value" and updates an existing record. Ofcourse, it also recalculates whether it is a paldindrome or not.
- DELETE api/message/:id: Deletes a message with said ID

# Building locally
- Clone the repository: `git clone https://github.com/SamuelChanMD/message.git`
- Go into the project directory
- Checkout `dockerContainers` branch
- Run `docker-compose up`
- Application should be running on `http://localhost:3000`

# Deployment Information
There is an AWS pipeline for continous deployment on an ElasticBeanstalk environment against the  `main` branch. Although, I have setup Docker containers on the `dockerContainers` branch, I have not setup a new environment and pipeline on AWS for deploying an containerized application. So for now, the `main` branch does not have Docker available. It is still connected to a database though and will store messages.
Link: http://message-env.eba-upgsnkzt.us-east-2.elasticbeanstalk.com

# Test
Right now, the tests are very simple as there are only unit tests. To run the test, simply run "node test"

