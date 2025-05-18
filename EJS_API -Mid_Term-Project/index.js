import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const api_url = "http://localhost:4000";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${api_url}/users`);
    res.render("addUser.ejs", { users: response.data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/users", async (req, res) => {
  try {
    const response = await axios.get(`${api_url}/users`);
    res.render("previewUsers.ejs", { users: response.data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


app.get("/addUsers", (req, res) => {
  res.render("addUser.ejs", {
    heading: "Add New User",
    submit: "ADD USER",
  });
});

app.post("/api/users", async (req, res) => {
  try {
    const response = await axios.post(`${api_url}/users`, {
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
      gender: req.body.gender,
      address: req.body.address,
    });
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: " Internal Server Error", error: error });
  }
});


app.post("/api/users/delete/:id", async (req, res) => {
    const id = req.params.id;
  try {
    const response = await axios.delete(`${api_url}/users/${id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: " Internal Server Error", error: error });
  }
});

app.get("/edituser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`${api_url}/users/${id}`);
    res.render("editpost.ejs", {
      heading: "Edit user",
      submit: "Update user",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: " Internal Server Error", error: error });
  }
});

app.post("/editpost/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.patch(`${api_url}/posts/${id}`, {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    });
    res.redirect("/myBlogs");
  } catch (error) {
    res.status(500).json({ message: " Internal Server Error", error: error });
  }
});

app.get("/posts/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const response = await axios.get(`${api_url}/posts/${postId}`);
    res.render("viewPost.ejs", { post: response.data });
  } catch (error) {
    res.status(404).send("Post not found");
  }
});

app.listen(port, () => {
  console.log("server: localhost:3000");
});

