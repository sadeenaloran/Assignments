import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

const__filename =fileURLToPath(import.meta.url);
const__dirname = path.dirname(__filename);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname, '../public'));

app.use('/',router)
app.use('/',router)


// to run the app on port we determined
app.listen(process.env.PORT, () => {});
