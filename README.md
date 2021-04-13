# message

# quick description of architecture
# how to build, deploy, test, access application

# Building locally
- Clone the repository: `git clone https://github.com/SamuelChanMD/message.git`
- Checkout `dockerContainers` branch. 
- Run `docker-compose up`

# Deployment Information
There is an AWS pipeline to continously deploy any changes on the `main` branch to an ElasticBeanstalk environment. However, I didn't get to creating a new environment and pipeline that would work with Docker. So right now, it deploys the code without containerization and connects to a database I spun up on AWS.
Link: http://message-env.eba-upgsnkzt.us-east-2.elasticbeanstalk.com

# Test
Right now, the tests are very simple as there are only unit tests. To run the test, simply run "node test"

