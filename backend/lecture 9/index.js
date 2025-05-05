import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let colors = [
  { id: 1, color: "Red", value: "#FF0000" },
  { id: 2, color: "Green", value: "#00FF00" },
  { id: 3, color: "Blue", value: "#0000FF" },
  { id: 4, color: "Yellow", value: "#FFFF00" },
  { id: 5, color: "Purple", value: "#800080" },
  { id: 6, color: "Orange", value: "#FFA500" },
  { id: 7, color: "Pink", value: "#FFC0CB" },
  { id: 8, color: "Brown", value: "#A52A2A" },
  { id: 9, color: "Black", value: "#000000" },
  { id: 10, color: "White", value: "#FFFFFF" },
  { id: 11, color: "Gray", value: "#808080" },
  { id: 12, color: "Cyan", value: "#00FFFF" },
  { id: 13, color: "Magenta", value: "#FF00FF" },
];

app.use(bodyParser.urlencoded({ extended: true }));
// GET API 
app.get("/colors", (req, res) => {
  res.json(colors);
});
// GET Random element 
app.get("/random", (req, res) => {
  // to select random index of the colors.
  const randomColor = Math.floor(Math.random() * colors.length);
  // to return the object of this index.
  res.json(colors[randomColor]);
});
// GET element by id --> to return specific color by id. -> in route the name of id is parameter.
app.get("/colors/:id", (req, res) => {
  // everything in the req (parameters, query parameters,..) return as an string so, needs to convert them into int by parseInt (id type in list number)
  const id = parseInt(req.params.id);
  // to search the id in the list.
  // == the check is based on the value, not the type.
  const colorObj = colors.find((color) => color.id === id);
  res.json(colorObj);
});

// in filtering use pass as an query parameter.
app.get("/filter", (req, res) => {
  const colorQ = req.query.color;
  const listOfFilteredColors = colors.filter((color) => color.color === colorQ);
  res.json(listOfFilteredColors);
});

// POST API --> to create new object in database 
app.post("/colors", (req, res) => {
  const newColor = {
    id: colors.length + 1,
    color: req.body.color,
    value: req.body.value,
  };
  colors.push(newColor);
  res.status(200).json(newColor);
});
// PUT API --> Edit on color already exisiting same (get color by id)
app.put("/colors/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedColor = {
    id: id,
    color: req.body.color,
    value: req.body.value,
  };
  const colorIndex = colors.findIndex((color) => color.id === id);
  colors[colorIndex] = updatedColor;
  res.json(updatedColor);
});

// PATCH API --> Edit on a specific variables not all variables
app.patch("/colors/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const colorObj = colors.find((color) => color.id === id);
  const updatedColor = {
    id: id,
    color: req.body.color || colorObj.color,
    value: req.body.value || colorObj.value,
  };

  const colorIndex = colors.findIndex((color) => color.id === id);
  colors[colorIndex] = updatedColor;
  res.json(updatedColor);
});

// app.delete("/colors/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const colorIndex = colors.findIndex((color) => color.id === id);
//   if (colorIndex > -1) {
//     color.splice(colorIndex, 1);
//     res.sendStatus(200);
//   } else {
//     res.sendStatus(404).json({ error: `Color id ${id} not found` });
//   }
// });

// app.delete("/all/:id", (req, res) => {
//   colors = [];
//   res.sendStatus(200);
// });

app.listen(port, () => {});
