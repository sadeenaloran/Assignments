import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true })); 
class Post {
  constructor(id, title, content, author, date) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.date = date;
  }
}
let posts = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts });
});

app.get("/addBlog", (req, res) => {
  res.render("addBlog.ejs", { posts: posts });
});

app.get("/myBlogs", (req, res) => {
  res.render("myBlogs.ejs", { posts: posts });
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.post("/createpost", (req, res) => {
  const newPost = new Post (
    posts.length + 1,
    req.body.title,
    req.body.content,
    req.body.author,
    new Date(),
  );

  posts.unshift(newPost);
  res.render("index.ejs", { posts: posts });
});


app.post("/deletePost/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter(post => post.id !== postId);
  res.render("index.ejs", { posts: posts });
});

app.get("/editpost/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(post => post.id === postId);
  if (post) {
    res.render("editpost.ejs", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/editpost/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const index = posts.findIndex(post => post.id === postId);

  if (index !== -1) {
    posts[index].title = req.body.title;
    posts[index].content = req.body.content;
    posts[index].author = req.body.author;
    res.redirect("/myBlogs");
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(post => post.id === postId);

  if (post) {
    res.render("viewPost.ejs", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

app.listen(port, () => {});






