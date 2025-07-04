// to make database configration.
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: true }
      : false,
});

// Just to check that the connection is good on the database.
pool.connect().then(() => {
  console.log("Database connected");
});

// like we generate a callback function here same as: function query (text,params){retrn pool.query(text,params)}
export const query = (text, params) => pool.query(text, params);

export default pool;
