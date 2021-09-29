const fib = function(num){
    let n=num;
    if(num<=0){
        n=n*(-1);
    }
    if(n<=1){
        return n;
    }
    return fib(n-1)+fib(n-2);
}

module.exports = fib;