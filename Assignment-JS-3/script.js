function factorial(num){
    result=1;
    for(let x=num; x>1; x--){
        result *= x;
    }
    return result;
}
console.log(factorial(5));