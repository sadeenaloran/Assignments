import express from "express";
const app = express();

// to access dircet on static files in public folder.
app.use(express.static("public"))

const port = 3000;

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.listen(port, () => {});
