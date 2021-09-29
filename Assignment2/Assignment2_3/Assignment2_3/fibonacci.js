const fibonacci = function(num){
    let n=num;
    if(n<0){
        n=n*(-1);
    }
    if(n<=1){
        return n;
    }
    else{
        return fibonacci(n-1)+fibonacci(n-2);
    }
}
console.log("Fibonacci of 30 is "+ fibonacci(30));
console.log("Fibonacci of -15 is "+ fibonacci(-15));
module.exports = fibonacci;