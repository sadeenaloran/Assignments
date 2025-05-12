import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
 
const app = express();
const port = 4000;
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
//===============================================
// PostgreSQL database connection
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "blog",
  password: "karla123456",
  port: 5432,
});
 
db.connect()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });
 
 
  app.get('/', (req, res) => res.send('Welcome to the API'));
 
//===============================================
// GET all posts
app.get("/posts", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM posts ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
 
// GET single post by ID
app.get("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await db.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
 
// CREATE new post
app.post("/posts", async (req, res) => {
  const { title, content, author } = req.body;
  console.log(req.body);
  try {
    const result = await db.query(
      "INSERT INTO posts (title, content, author, date) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [title, content, author]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});
 
// UPDATE post (partial) - PATCH
app.patch("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, author } = req.body;
 
  try {
    // Get current post
    const current = await db.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (current.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
 
    const post = current.rows[0];
 
    const updated = await db.query(
      "UPDATE posts SET title = $1, content = $2, author = $3 WHERE id = $4 RETURNING *",
      [title || post.title, content || post.content, author || post.author, id]
    );
 
    res.json(updated.rows[0]);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
});
 
// REPLACE post (full update) - PUT
app.put("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, author } = req.body;
 
  try {
    const exists = await db.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (exists.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
 
    const updated = await db.query(
      "UPDATE posts SET title = $1, content = $2, author = $3, date = NOW() WHERE id = $4 RETURNING *",
      [title, content, author, id]
    );
 
    res.json(updated.rows[0]);
  } catch (error) {
    console.error("Error replacing post:", error);
    res.status(500).json({ error: "Failed to replace post" });
  }
});
 
// DELETE post
app.delete("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deleted = await db.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [id]
    );
    if (deleted.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.sendStatus(204); // No Content
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
});
 
app.listen(port, () => {
  console.log(`API Server running correctly on port ${port}`);
});
 