const uuid = require('uuid');
const logger = require('../../logger.js');
const db = require('../../db.js');
const messageORM = require('../object-relational-models/message.js');
const {createAPIError} = require('./utils.js');

// Function to determine whether a value is a palindrome or not
const { setFunction: isPalindrome } = messageORM.fields.palindrome;

// List of queries
const {
    getAllQuery,
    getQuery,
    insertQuery,
    updateQuery,
    deleteQuery,
} = messageORM.queries;

// TODO: validation is not being used yet. also return values are weird.
function isValidBody(body) {
    if (!body) return createAPIError('Missing request body');
    if (!body.value) return createAPIError('Missing value');
    if (typeof body.value !== 'string') return createAPIError('Value must be a string');
    return;
}

module.exports = function(app) {

    app.get('/api/messages', (req, res, next) => {
        // Note: space issue could arise
        db.query(getAllQuery, (err, results) => {
            if (err) return next(err);
            res.json(results.rows);
        });
    });
    
    app.get('/api/message/:id', (req, res, next) => {
        const {id} = req.params;
        db.query(getQuery, [id], (err, result) => {
            if (err) return next(err);
            if (!result.rows[0]) next(createAPIError('Message not found', 404));
            res.json(result.rows[0]);
        });
    });
    
    app.post('/api/message', (req, res, next) => {
        const {body} = req;
    
        const insertValues = [
            uuid.v4(),
            new Date(),
            new Date(),
            body.value,
            isPalindrome(body),
        ];
        db.query(insertQuery, insertValues, (err, newMessage) => {
            if (err) return next(err);
            res.json(newMessage.rows[0]);
        });
    });
    
    app.patch('/api/message/:id', (req, res, next) => {
        const {body} = req;
        const {id} = req.params;
    
        const updateValues = [
            body.value,
            isPalindrome(body),
            new Date(),
            id,
        ];
        db.query(updateQuery, updateValues, (err, results) => {
            if (err) return next(err);
            res.send('Message successfully updated');
        });
    });

    app.delete('/api/message/:id', (req, res,next) => {
        const {id} = req.params;
        db.query(deleteQuery, [id], (err, results) => {
            if (err) return next(err);
            res.send('Message successfully deleted');
        })
    });
};