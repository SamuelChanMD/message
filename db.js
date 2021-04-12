/**
 * Connection to database
 */

const {Pool} = require('pg');

const pool = new Pool({
    'host': process.env.RDS_HOST || '127.0.0.1',
    'port': 5432,
    'user': process.env.RDS_USERNAME || 'postgres',
    'password': process.env.RDS_PASSWORD || 'irwtj21!',
    'database': process.env.RDS_DB_NAME || 'message',
    'max': 3,
    'connectionTimeoutMillis': 10000, // 10 seconds
    'idleTimeoutMillis': 0,
});

module.exports = pool;