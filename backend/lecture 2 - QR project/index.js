/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
inquirer
  .prompt([
    {
      message: "Please enter URL:",
      name: "url",
    },
  ])
  .then((answers) => {
    console.log(answers.url);

    var qr_png = qr.image(answers.url);
    // fs to convert text,file to image or any file i want.
    qr_png.pipe(fs.createWriteStream("qr-img.png"));
    fs.writeFile("qr-inputs", answers.url, (err) => {
      if (err) throw err;
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment.");
    } else {
      console.error("Something went wrong:", error);
    }
  });
