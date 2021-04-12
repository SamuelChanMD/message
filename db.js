/**
 * Connection to database
 */

const {Pool} = require('pg');
const logger = require('./logger.js');

const pool = new Pool({
    'host': process.env.RDS_HOSTNAME || '127.0.0.1',
    'port': 5432,
    'user': process.env.RDS_USERNAME || 'postgres',
    'password': process.env.RDS_PASSWORD || 'irwtj21!',
    'database': process.env.RDS_DB_NAME || 'message',
    'max': 3,
    'connectionTimeoutMillis': 10000, // 10 seconds
    'idleTimeoutMillis': 0,
});

logger.warn(`does rds_hostname exist? ${process.env.RDS_HOSTNAME}`);
logger.warn(`does db host exist? ${process.env.DB_HOST}`);
logger.warn(`does rds_db_name exist? ${process.env.RDS_DB_NAME}`);
logger.warn(`does db database exist? ${process.env.DB_DATABASE}`);

module.exports = pool;