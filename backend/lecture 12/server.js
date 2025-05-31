// to prepare backend app
import app from './app.js'
import dotenv from 'dotenv'

// if there is any issue in dotenv file and not correctly defined port or there is no port founded --> put default port: "5000".
const PORT = process.env.PORT || "5000";
const ENV = process.env.NODE_ENV || "development";

dotenv.config();

app.listen(PORT, ()=> {
    console.log(`Server is running in ${ENV} mode on port ${PORT}`)
});
