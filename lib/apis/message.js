/**
 * Available endpoints for the message
 */
const uuid = require('uuid');
const logger = require('../../logger.js');
const db = require('../../db.js');
const {message: messageModel} = require('../object-relational-models/index.js');
const {createAPIError} = require('../utils.js');

// Function to determine whether a value is a palindrome or not
const { setFunction: isPalindrome } = messageModel.fields.palindrome;

// List of queries
const {
    getAllQuery,
    getQuery,
    insertQuery,
    updateQuery,
    deleteQuery,
} = messageModel.queries;

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
            uuid.v4(), // id
            new Date(), // created_date
            new Date(), // updated_date
            body.value, // value
            isPalindrome(body), // palindrome
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
            body.value, // value
            isPalindrome(body), // palindrome
            new Date(), // updated_date
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