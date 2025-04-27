import express from "express";
import bodyParser from "body-parser";
// to get html file.
import {dirname} from "path";
import { fileURLToPath } from "url";
// i get the path of my folder
const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express();
const port = 3000;
let userInfo = {
    email: null,
    password: null,
}; 

// must be before routhandler.
// take url and take from it query parameter and store them in req in body attribute, return it as an json object.
app.use(bodyParser.urlencoded({extended: true}));

// custome middle ware (custome paresr:i make the operation inside it).
// in any middleware it has to have next.
function saveToDb (req, res, next){ 
    console.log(req.body);
    console.log(userInfo.email);
    if (req.body){
         userInfo.email = req.body["email"];
         userInfo.password = req.body["password"];
    }
    next();
}
app.use(saveToDb);

app.get("/",(req, res)=>{
    res.sendFile(__dirname + "/public/index.html")
})
// how to do req and get the res from req.
app.post("/submit",(req, res)=>{
    console.log(req.body)
    res.send(`<h1>Your email ${userInfo.email} and password  ${userInfo.password}</h1>`);
});

app.listen(port, ()=>{
    console.log("server");
})
// app.get("/login", (req, res) => {
//   res.send(`<form>
//     <label>Email</label>
//     <input type="email" name="email" placeholder="Enter email" required />
//     <br>
//     <label>Password</label>
//     <input type="password" name="password" placeholder="Enter password" required />
//     <br>
//     <button type="submit">Submit</button>
//     </form>`);
// });

