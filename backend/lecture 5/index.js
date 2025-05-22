import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/public/index.html")
});

// user enter username and we want to return a welcoming command or html page  in the respose.
app.post("/submit", (req,res)=>{
    const name= req.body.name
    res.render("index.ejs",{
        name: name,
        cart:["item 1", "item 2", "item 3"],
        content:"Hello, How are you?"
    });
}); 

app.listen(port, ()=>{
    console.log("server");
});