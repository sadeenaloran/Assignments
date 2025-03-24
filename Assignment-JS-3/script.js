// function factorial(num){
//     result=1;
//     for(let x=num; x>1; x--){
//         result *= x;
//     }
//     return result;
// }
// console.log(factorial(5));

// let arr=[1, 2, 3, 4, 5];
// let triple = arr.map((x)=> x*3);
// console.log(triple);

// let arr1=[1, 2,2, 3,3, 4, 5];
// let unique = arr1.filter((i, j, uni) => uni.indexof(i) === j );
// console.log(unique);

// let array=[
//     {name:"hussam", age:30},
//     {name:"Ali", age:40},
//     {name:"Ahmad", age:22},
// ];

// let sorting= array.sort((a, b) => a.age - b.age);
// console.log(sorting);


// function getMaxValue(arr) {
//     let max = arr[0]; 
//      for (let i = 1; i < arr.length; i++) { 
//         if (arr[i] > max) {
//             max = arr[i]; 
//         }
//    }
//     return max;
// }

// let arr = [1, 5, 9, 6, 3, 87, 72, 23];
// console.log(getMaxValue(arr));


function reverseArr(revarr) {
     let reversed = [];
     for (let i = revarr.length - 1; i >= 0; i--) {
        reversed.push(revarr[i]);
    }
     return reversed;
 }

let revarr = [1, 2, 3, 4, 5];
console.log(reverseArr(revarr));

function summation(array, target) {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] + array[j] === target) {
                return [array[i], array[j]]; 
            }
        }
    }
    return "Not Found!"; 
}

let arr = [1, 5, 9, 6, 3, 87, 72, 23];
console.log(summation(arr, 9)); 