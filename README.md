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

# Some improvements to make in future versions
- Utilise nginx for load balancing and rate limiting
- Either install or develop a fully fledged Object Relational Model for increased configurability.
    - This would be helpful if we decided to capture more than just messages. Maybe we would a table for numbers, for example, with data that captures whether it is a prime number or not. Or maybe we want to create another column in the message table to capture whether the message has duplicate characters.
- Research into using the adapter pattern for interacting with the database so that it is more seamless to switch between databases if need be
- Add functional tests to test the CRUD actions on messages. Example: ensuring that a POST request with a valid body passes and POST request with invalid data fails.
- Utilise environment variables for setting up the Docker containers