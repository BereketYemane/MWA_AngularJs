module.exports = function (number) {
    let n = number;
    if (n < 0) {
        n = n * (-1);
    }

    let f1 = 0, f2 = 1;
    for (let i = 2; i <= n; i++) {
        f3 = f1 + f2;
        f1 = f2;
        f2 = f3;
    }
    console.log("The " + number + "th Fibonacci is:", f3);
}

