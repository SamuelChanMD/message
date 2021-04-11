/**
 * Connection to database
 */

const {Pool} = require('pg');

const pool = new Pool({
    'host': '127.0.0.1',
    'port': 5432,
    'user': 'postgres',
    'password': 'irwtj21!',
    'database': 'message',
    'max': 3,
    'connectionTimeoutMillis': 10000, // 10 seconds
    'idleTimeoutMillis': 0,
});

module.exports = pool;