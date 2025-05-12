import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
let posts = [
  {
    id: 1,
    title: "Effortless Street Style — Turning Basics Into Bold Looks",
    content:
      "There's something powerful about simplicity. This season, I've been obsessed with transforming everyday basics white tees, denim jackets, and plain sneakers into bold, head-turning outfits with just a few statement pieces. A chunky necklace, a bright bucket hat, or even a patterned belt can change the whole vibe. Yesterday, I styled a basic white crop top with high-waisted mom jeans, layered it with an oversized blazer, and threw on my go to platform sneakers. Add a red lip and gold hoops? Instant upgrade.<br /> ✨ Street style isn't about following the rules it's about rewriting them with your personal twist. What's your favorite go-to piece that always makes you feel confident? #StreetStyle #MinimalToBold #EverydayChic #OOTD",
    author: "Author: LaylaTrendz",
    date: "Mon April 15 2025 15:30:20",
  },
  {
    id: 2,
    title: "From Simple to Standout — Mastering the Art of Street Style",
    content:"Who says comfort can't be chic? Lately, I've been diving into my closet and realizing that the most low-key pieces are the ones with the most potential. Think: oversized hoodies, black leggings, and classic white sneakers. With the right styling, they go from lazy day to runway-ready. Today, I paired my charcoal hoodie with faux leather joggers, added a neon green mini bag, and topped it off with angular sunglasses. The vibe? Relaxed, but intentional. <br /> ✨ Street style is all about self-expression — it's mixing high with low, soft with structured, and never apologizing for being bold. What's your secret trick to turning a chill outfit into a fashion statement? #StyleYourWay #StreetChic #EffortlessEdge #ComfyCool",
    author: "Author: ZaraMode",
    date: "Sun March 30 2025 12:15:36",
  },
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let lastId = 2;

app.get("/posts", (req, res)=>{
    res.json(posts);
});

app.get("/posts/:id", (req, res)=>{
    const id =  parseInt(req.params.id);
    const post = posts.find((post)=> post.id === id);
    if (post) return res.json(post);
    res.status(404).json({error:"Post Not Found"});
});

app.post('/posts', (req, res)=>{
    lastId++;
    const newPost = {
        id: lastId,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: new Date(),
    };

    posts.push(newPost);
    res.status(201).json(newPost)
});

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

app.delete('/posts/:id', (req, res)=>{
    const id = parseInt(req.params.id); 
    const postIndex = posts.findIndex((post)=> post.id === id);
    if (postIndex > -1) {
    posts.splice(postIndex, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404).json({ error: `post id ${id} not found` });
  }
});

app.delete('/posts', (req, res)=>{
    posts = [];
    res.json(posts);
});

app.listen(port, () => {
    console.log('Api: localhost:4000')
});
