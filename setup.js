/**
 * Script to setup application
 */
const fs = require('fs');
const async = require('async');
const db = require('./db.js');
const logger = require('./logger.js');
const orms = require('./lib/object-relational-models/index.js');

// Create a table in the db for each model
async.eachOfLimit(orms, 3, function iteratorFn(model, table, done) {
    // Ideally, we would create tables dynamically from the configured fields
    const createTableQuery = fs.readFileSync('./lib/queries/message/create_table.sql').toString();

    db.query(createTableQuery, (err, results) => {
        if (err) {
            return done(err);
        }
        logger.success(`Created ${table} table`);
        done();
    });

}, function finishedFn(err) {
    if (err) {
        logger.error(err);
        process.exit(1);
    }
    process.exit(0);
});

