let tweet = "check this sample if it's long or not";
if (tweet.length > 280) {
  console.log("Tweet is too long!");
} else {
  console.log("Tweet is within the limit.");
}

function checkUsername (username){
  return username = username.charAt(0).toUpperCase() + username.slice(1) 
}
console.log(checkUsername('sadeen'));

let title = "good morning";
console.log(title.toUpperCase()); 
console.log(title.toLowerCase()); 

let email = "   sadeen12@hotmail.com   ";
console.log(email.trim());

let article = "This is an article to descibe the weather today";
console.log(article.slice(0, 30) + "..."); 

let phoneNumber = "0795566125";
function maskphone(phoneNumber){
  return "*** ***" +phoneNumber.substring(6)
}
console.log(maskphone(phoneNumber));

let words = "This is gggg and very baddd!";
let corrected = words.replace("gggg", "bad");
console.log(corrected);

let userComment = "JavaScript is amazing!";
let comment = userComment.split(" ");
console.log(comment); 

userInput = "This is a bad comment.";
function restricted(userInput) {
  if (userInput.includes("bad")) {
    return "Comment contains restricted words!";
  } else {
    return "Comment is clean.";
  }
}
console.log(restricted(userInput));

let fileName = "image.png";
if (fileName.endsWith(".png") || fileName.endsWith(".jpg")) {
  console.log("This is an image file.");
} else {
  console.log("This is not an image file.");
}

console.log("-".repeat(50));

let part1 = "Introduction";
let part2 = " to JAVASCRIPT";
console.log(part1.concat(part2));

let paragraph = "JavaScript is a programming language";
console.log(paragraph.indexOf("programming"));
console.log(paragraph.lastIndexOf("programming")); 