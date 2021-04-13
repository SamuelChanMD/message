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
    const createTableQuery = fs.readFileSync(`./lib/queries/${table}/create_table.sql`).toString();

    db.query(createTableQuery, (err, results) => {
        // Should not have logic depend on error message since it can change
        // but it will have to do for now.
        if (err && err.message === `relation "${table}" already exists`) {
            logger.info(`Relation ${table} already exists.`);
            return done();
        } else if (err) {
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

