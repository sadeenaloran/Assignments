import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config()
// to connect with db 
const {Pool} = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

// to use pool every where i want in the project.
export default pool;
