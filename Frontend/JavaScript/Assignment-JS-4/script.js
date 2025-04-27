//Count Vowels in a String

let text="JavaScript";
let countnum= 0;
function count(text){
    for (i=0; i<= text.length-1; i++) {
        if (text[i] === 'a' || text[i]==='e' || text[i]==='i' || text[i]==='o' || text[i]==='u'){
         countnum ++;
        } 
    }
   return countnum;
}
console.log(count("JavaScript"))
 
//Check Even or Odd Numbers in an Array

let input=[1, 4, 7, 10];
function checknum(input){
    for (let x=0; x<input.length; x++){
        if (input[x] %2 ===0){
         console.log(`${input[x]} is even`)
        } else {
         console.log(`${input[x]} is odd`)
        }
    }
}
checknum(input)

// //Find Longest Word in a String

let sentence="I love JavaScript programming";
function longestword(sentence){
     let words = sentence.split(" ");
     let longestOne=" ";
     for (let w of words){
         if ( w.length > longestOne.length){
             longestOne = w;
         }
     }
     return longestOne;
 }
console.log(longestword(sentence))


//FizzBuzz Problem

for (let j=1; j<=50; j++){
    if (j % 3 === 0 && j % 5 === 0){
        console.log("fizzBuzz");
    } else if (j % 3 === 0){
        console.log("fizz");
    } else if (j % 3 === 0){
        console.log("buzz");
    } else {
        console.log(j);
    }
}

//Find the Second Largest Number in an Array

let inputArr =[10, 5, 20, 8, 12];
function secondlargestnum (inputArr){
    let largest = 0;
    let secondlargest = 0;
    for(let s=0; s<inputArr.length; s++){
        if(inputArr[s]> largest){
            secondlargest = largest;
            largest = inputArr[s];
        }else if (inputArr[s]> secondlargest && inputArr[s] !==largest){
            secondlargest = inputArr[s];
        }
    }
    return secondlargest;
}
console.log(secondlargestnum(inputArr))


//Flatten a Nested Array

