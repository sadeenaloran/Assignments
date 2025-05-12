import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
// api url is the link that contain our apis.
// http://localhost:4000/ --> endpoint of any API
const api_url = "http://localhost:4000/";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes and they can make an apis calls.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${api_url}/posts`);
    // the data that returns from the response of api request.
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
// multiple route for more then one page.
// create new post.
app.get("/create-post", (req, res) => {
  // modify.ejs--> page for create and use it for edit.
  res.render("modify.ejs", {
    heading: "Create New Post",
    submit: "Create Post",
  });
});
app.get("/edit-post", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`${api_url}/posts/${id}`);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Edit Post",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: " Internal Server Error", error: error });
  }
});
// create API (pure API call)
app.post("/api/posts", async (req, res) => {
  try {
    // how to send body in api call, send json to api
    const response = await axios.post(`${api_url}/posts`, {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    });
    // after create return to home page to preview posts.
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: " Internal Server Error", error: error });
  }
});

// Edit API (pure API call)
app.post("/api/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.post(`${api_url}/posts/${id}`, req.body);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: " Internal Server Error", error: error });
  }
});

// Delete API (pure API call)
// after delete api call --> i want to return all posts.
app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.delete(`${api_url}/posts/${id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: " Internal Server Error", error: error });
  }
});

app.listen(port, () => {
  console.log("server: localhost:3000");
});
