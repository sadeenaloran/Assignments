import pg from 'pg';
import dotenv from 'dotenv';
// to use the variables i defined in .env, i need to:
dotenv.config()
// Connection string --> process.env.DATABASE_URL

// to connect with db like:new pg.Client.
// Pool --> it's a constructor inside pg package.
const {Pool} = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
// i will use pool to make query instead of db.

// to use pool every where i want in the project, in ECMAS6.
export default pool;
