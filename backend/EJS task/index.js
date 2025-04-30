import express from "express";
const app = express();
app.use(express.static("public"));
const port = 3000;
app.use(express.urlencoded({ extended: true })); 
app.get('/',(req, res)=>{
    res.render("index.ejs");
});
// other way and it's not best practice
// app.get('/',(req, res)=>{
//     res.render("index.ejs", {randomName1:null, randomName2:null});
// });
// the best practice way to generate a random number (0-1)
app.post('/submit',(req, res)=>{
    const randomName1= names[Math.floor(Math.random()*names.length)];
    const randomName2= colors[Math.floor(Math.random()*colors.length)];
    res.render("index.ejs",{
        // use this variables inside index.ejs
        randomName1: randomName1,
        randomName2: randomName2,
    });
})
// then concate them in index.ejs
app.listen(port,()=>{})

const names = [
    "Liam",
    "Olivia",
    "Noah",
    "Emma",
    "Elijah",
    "Ava",
    "James",
    "Sophia",
    "Benjamin",
    "Isabella",
    "Lucas",
    "Mia",
    "Henry",
    "Amelia",
    "Alexander",
    "Harper",
    "Ethan",
    "Evelyn",
    "William",
    "Charlotte"
];
const colors = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Purple",
    "Orange",
    "Pink",
    "Brown",
    "Black",
    "White",
    "Gray",
    "Cyan",
    "Magenta",
    "Lime",
    "Teal",
    "Indigo",
    "Violet",
    "Gold",
    "Silver",
    "Beige"
];
    