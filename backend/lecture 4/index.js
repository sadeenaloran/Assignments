import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express();
const port = 3000;
const secretPassword = "artificialintelligence";

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req, res)=>{
    res.sendFile(__dirname + "/public/index.html")
});

app.post("/submit",(req, res)=>{
    const enteredPassword = req.body.password;
    if (enteredPassword === secretPassword) {
        res.sendFile(__dirname + "/public/secret.html")
    } else {
        res.sendFile(__dirname + "/public/index.html");
    }    
});


app.listen(port, ()=>{
    console.log("server");
})

// let secret = {
//     password: null,
// }; 

// function saveToDb (req, res, next){ 
//     if (req.body){
//         secret.password = req.body.password;}
//     next();
// }
// app.use(saveToDb);




