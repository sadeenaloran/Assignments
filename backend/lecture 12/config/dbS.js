import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres", // type of connection (databse)
    logging: process.env.NODE_ENV === "development" ? console.log : false, //to logs queries or SQL commands.
    dialectOptions: {
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: true }
          : false,
    },
    // pool:{ // connection between backend app and database.
    // }
  }
);
// direct do this function -> (async () => {})
async () => {
  try {
    await sequelize.authenticate();
    console.log("Postgres connected via sequelize"); //if there is no problem in connection.
  } catch (error) {
    console.log(error);
  }
};

// to do object relational model --> use sequelize (needs to connect the db to control all thing)
// in seguelize -> instead to write SQL queries, use objects and methods inside these objects.
 
export default sequelize;
