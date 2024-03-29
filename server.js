const express = require('express');
const logger = require('./logger.js');
const validationMiddleware = require('./lib/middleware/validation.js');
const messageApis = require('./lib/apis/message.js');

// Port to listen to
const port = process.env.port || 8080;

// Initialize web application
const app = express();

// Middleware to parse JSON payloads
app.use(express.json());

// Middleware to encode url
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Welcome to the Message App!')
});

// Middleware for common validation
validationMiddleware(app);

// Add endpoints for messages
messageApis(app);

// Log any errors passed through express
app.use((err, req, res, next) => {
    logger.error(err);
    next(err);
});

// Send error status with default being 500
app.use((err, req, res, next) => {
    const {httpStatus = 500} = err;
    res.sendStatus(httpStatus);
});

app.listen(port, () => {
    logger.info(`Listening to port ${port}`);
});
