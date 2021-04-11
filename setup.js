/**
 * Script to setup application
 */
const fs = require('fs');
const db = require('./db.js');
const logger = require('./logger.js');

// Ideally would grab all files named `create_table.sql` under queries folder dynamically
// and create table from the message ORM's fields
const createTableQuery = fs.readFileSync('./lib/queries/message/create_table.sql').toString();

db.query(createTableQuery, (err, results) => {
    if (err) {
        logger.error(err);
        process.exit(1);
    }
    logger.success('Created message table');
    process.exit(0);
});

