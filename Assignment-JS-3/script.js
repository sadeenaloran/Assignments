function factorial(num){
    result=1;
    for(let x=num; x>1; x--){
        result *= x;
    }
    return result;
}
console.log(factorial(5));

let arr=[1, 2, 3, 4, 5];
let triple = arr.map((x)=> x*3);
console.log(triple);

let arr1=[1, 2,2, 3,3, 4, 5];
let unique = arr1.filter((i, j, uni) => uni.indexof(i) === j );
console.log(unique);

let array=[
    {name:"hussam", age:30},
    {name:"Ali", age:40},
    {name:"Ahmad", age:22},
];

let sorting= array.sort((a, b) => a.age - b.age);
console.log(sorting);