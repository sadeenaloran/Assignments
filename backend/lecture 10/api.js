import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
let posts = [
    {
        id:1,
        title:"xccc",
        content:"ccccc",
        author:"cc",
        date:"ccc",
    },
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let lastId = 3;

// READ IN CRUD OPERATIONS
// API to get all posts. (test it on postman)
app.get("/posts", (req, res)=>{
    res.json(posts);
});

// API to get one post by id.(when i do edit-> the data fill in post it comes from get post by id).
app.get("/posts/:id", (req, res)=>{
    const id =  parseInt(req.params.id);
    const post = posts.find((post)=> post.id === id);
    //  to check if thr object will be in the database or not.(it's normal that one of users do delete an another one do get in the same time)
    if (post)
        res.json(post);
    // always send an error message as an json 
    res.status(404).json({error:"Post Not Found"});
});
// CREATE IN CRUD OPERATIONS
// API to post posts. (test it on postman)
app.post('/posts', (req, res)=>{
    // to update the lastId.
    lastId++;
    const newPost = {
        id: lastId,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: new Date(),
    };

    posts.push(newPost);

    // just for testing we send the status.
    res.status(201).json(newPost)
});

// UPDATE IN CRUD OPERATIONS
// API to patch posts. (test it on postman)
// to be in the safe side use patch because user not always give me or return the variables for title, content, author,...
app.patch('/posts/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const postIndex = posts.findIndex((post)=> post.id === id);
    const postObj  = posts[postIndex];
    const updatedPost = {
        id: id,
        title: req.body.title || postObj.title,
        content: req.body.content || postObj.content,
        author: req.body.author || postObj.author,
        date: postObj.date,
    };
    posts[postIndex] = updatedPost;
    res.status(200).json(updatedPost);
});
// UPDATE IN CRUD OPERATIONS
// API to put posts. (test it on postman)
app.put('/posts/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const postIndex = posts.findIndex((post)=> post.id === id);
    const postObj  = posts[postIndex];
    const updatedPost = {
        id: id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: new Date(),
    };
    posts[postIndex] = updatedPost;
    res.status(200).json(updatedPost);
});

// DELETE IN CRUD OPERATIONS
// API to delete posts. (test it on postman)
// in any crud operation we have to check the index.
app.delete('/posts/:id', (req, res)=>{
    const postIndex = posts.findIndex((post)=> post.id === id);
    if (postIndex > -1) {
    posts.splice(postIndex, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404).json({ error: `post id ${id} not found` });
  }
});
// Delete all
app.delete('/posts', (req, res)=>{
    posts = [];
    res.json(posts);
});

app.listen(port, () => {
    console.log('Api: localhost:4000')
});
