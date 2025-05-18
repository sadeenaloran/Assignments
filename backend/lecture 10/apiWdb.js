import express from "express";
import bodyParser from "body-parser";
// how to connect on databse.
import pg from "pg";
const app = express();
const port = 4000;

const db = new pg.Client({
  // inside the client we put the path that used to connect with database
  // default user --> postgres
  user: "postgres",
  // host that database Working on it.
  host: "localhost",
  // on any database in pgAdmin i want to connect.
  database: "blog",
  //  to get access on the database we need to enter password.
  password: "denizmir125",
  // To specify the port we need to access and the default port when install postgres is --> 5432.
  port: 5432,
});

// to sure that the connect successful.
db.connect()
  .then(() => {
    // just to check the connection successful or not.
    console.log("Connected to postgreSQL");
  })
  .catch(() => {});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ******* HOW TO WRITE QUERIES *******
// READ IN CRUD OPERATIONS
// API to get all posts.
app.get("/posts", async (req, res) => {
  //  write the select query same as in the pg Admin.
  // query select is a promise means async, so to hadle async by async and await.
  // to avoid any problem in application, must use try and catch.
  try {
    const result = await db.query("SELECT * FROM posts ORDER BY id");
    // to retrun data that comes from query to the user
    // rows--> array of objects.
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API to get one post by id.(when i do edit-> the data fill in post it comes from get post by id).
app.get("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    // to fill values in the query by this way.
    const result = await db.query("SELECT * FROM posts WHERE id = $1", [id]);
    //  $1 --> means that the data i want to return it's exist in the first index in values array.
    if (result.rows.length > 0) res.json(result.rows[0]);
    else res.status(404).json({ error: "Post Not Found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE IN CRUD OPERATIONS
// API to post posts.
app.post("/posts", async (req, res) => {
  // in javascript we can insert multiple values in the same time ar to compare between returns objects and stored in a set of attributes.
  const { title, content, author } = req.body;
  console.log(req.body);
  try {
    // to send values in the query, ** Order matters.
    const result = await db.query(
      "INSERT INTO posts(title, content, author) VALUES($1, $2, $3) RETURNING *",
      // values thet inserted i can retun thier by keyword (RETURNING), and * to return all th values.
      [title, content, author]
    );
    res.send(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE IN CRUD OPERATIONS
// API to patch posts. (test it on postman)
// to be in the safe side use patch because user not always give me or return the variables for title, content, author,...
app.patch("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, author } = req.body;
  try {
    const fields = [];
    const values = [];
    let count = 1;
    if (title) {
      fields.push(`title= $${count++}`);
      values.push(title);
    }
    if (content) {
      fields.push(`content= $${count++}`);
      values.push(content);
    }
    if (author) {
      fields.push(`author= $${count++}`);
      values.push(author);
    }
    values.push(id);

    const result = await db.query(
      // function used with array to convert it to string
      `UPDATE posts SET ${fields.join(
        ", "
      )}, date = NOW() WHERE id = $${count} RETURNING *`,
      values
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.sendStatus(404).json({ error: `post id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// UPDATE IN CRUD OPERATIONS
// API to put posts.
app.put("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, author } = req.body;
  try {
    const result = await db.query(
      "UPDATE posts SET title= $1, content = $2, author = $3, date = NOW() WHERE id = $4 RETURNING *",
      { title, content, author, id },
      [title, content, author, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.sendStatus(404).json({ error: `post id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE IN CRUD OPERATIONS
// API to delete posts.
app.delete("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await db.query(
      "DELETE FROM posts WHERE id = $1 RETURNING * ",
      [id]
    );
    if (result.rows.length > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404).json({ error: `post id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete all
// app.delete("/posts", (req, res) => {
//   posts = [];
//   res.json(posts);
// });

app.listen(port, () => {
  console.log("Api: localhost:4000");
});
