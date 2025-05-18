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
    const response = await axios.get(`${api_url}/posts`);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/addBlog", (req, res) => {
  res.render("addBlog.ejs");
});

app.get("/myBlogs", async (req, res) => {
  try {
    const response = await axios.get(`${api_url}/posts`);
    res.render("myBlogs.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/createpost", (req, res) => {
  res.render("index.ejs", {
    heading: "Create New Post",
    submit: "Create Post",
  });
});

app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${api_url}/posts`, {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    });
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: " Internal Server Error", error: error });
  }
});

app.post("/api/posts/delete/:id", async (req, res) => {
    const id = req.params.id;
  try {
    const response = await axios.delete(`${api_url}/posts/${id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: " Internal Server Error", error: error });
  }
});

app.get("/editpost/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`${api_url}/posts/${id}`);
    res.render("editpost.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
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






