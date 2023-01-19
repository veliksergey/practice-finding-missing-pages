const { Pool} = require('pg');

const pool = new Pool({
    database: 'johnson',
    user: 'postgres',
    password: 'postgres',
    port: 5432,
    host: 'localhost',
});

module.exports = { pool };