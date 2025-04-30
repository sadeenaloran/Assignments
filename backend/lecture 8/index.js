import https from "https";
import express, { response } from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
let colors= {
    black,
    red,
}
//this command by default will be in every code (i have to write it every time in code)
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    const options = {
        hostname: "https://api.wheretheiss.at/v1/satellites/25544",
        method: "GET",
    };
    // get take url endpoint + path (API call)
    const request = https.get(options.hostname, (response)=>{
        let data ="";
        response.on("data", (chunk)=>{
            data += chunk;
        });
    })
})


// build API (private) and return list
app.get("/color", (req,res)=>{
    res.json(json.parse(colors));
});
// build API (private) and return color with certain id.
app.get("/color/:id", (req,res)=>{
    res.json(json.parse(colors));
});