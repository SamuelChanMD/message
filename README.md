# Description

An application which stores messages and computes whether or not the message is a palindrome. Application is containerized in Docker as is the database, in this case Postgresql.

There are five endpoints:
- POST api/message
    - Action: Creates a message and indicates whether it is a palindrome or not
    - REQUEST BODY:
        ```
        {
            "value": "Message Value"
        }
        ```
    - 200 ok RESPONSE:
        ```
        {
            "id": "862d938a-29be-48f0-bc99-80b258d684a7",
            "value": "Message Value",
            "palindrome": false,
            "created_date": "2021-04-15T13:27:37.056Z",
            "updated_date": "2021-04-15T13:27:37.056Z",
        }
        ```
- GET api/message/:id
    - Action: Retrieves a message record with certain ID
    - REQUEST BODY: none
    - 200 ok RESPONSE:
        ```
        {
            "id": "862d938a-29be-48f0-bc99-80b258d684a7",
            "value": "Message Value",
            "palindrome": false,
            ...
        }
        ```
- GET api/messages: Return list of all messages
    - Action: Retrieves all messages. Note this is a little dangerous and it should probably use parameters to limit the response size, similar to a pagination.
    - REQUEST BODY: none
    - 200 ok RESPONSE:
        ```
        {
            "id": "862d938a-29be-48f0-bc99-80b258d684a7",
            ...
        },
        {
            "id": "1ffa1eba-65c1-4b89-b97d-c34b7279ba5c",
            ...
        },
        ...
        ```
- PATCH api/message/:id
    - Action: Updates an existing message with new message value and updates whether or not it is a palindrome
    - REQUEST BODY:
    ```
    {
        "value": "New Message Value"
    }
    ```
    - 200 ok RESPONSE: "Message successfully updated"
- DELETE api/message/:id
    - Action: Deletes a message
    - REQUEST BODY: none
    - 200 ok RESPONSE: "Message successfully deleted"

# Environment Variables
PORT=The port that the server is listening on. Less useful if using Docker as this would only modify the internal port mapping.
RDS_HOSTNAME=The database hostname
RDS_USERNAME=The username to connect to the database
RDS_PASSWORD=The password to connect to the database
RDS_DB_NAME=Name of the database

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