import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const data = {
    title: "EJS Tags",
    seconds: new Date().getSeconds(),
    items: ["apple", "banana", "cherry"],
    htmlContent: "<strong>This is some strong text</strong>",
  };
  res.render("index.ejs", data);
  //   const today = new Date();
  //   const day= today.getDay();
  //   let type= "a weekday";
  //   let advice= "it's time to work!";

  //   if (day === 5 || day === 6){
  //     type="the weekend";
  //     advice="it's time to have fun!"
  //   }

  // res.render("index.ejs", {
  //     type: type,
  //     advice: advice,
  // })
});
app.listen(port, () => {});
