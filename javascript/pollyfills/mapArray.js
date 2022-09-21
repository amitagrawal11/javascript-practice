

let arr = [2, 3, 4, 5, 6];

/* Map Polyfill */
Array.prototype.newMap = function (callbackFn, thisArg) {
    console.log('this: ', this);
    let result = [];
    for (let i = 0; i < this.length; i++) {
        if (!thisArg) {
            result.push(callbackFn(this[i], i, this));
        } else {
            result.push(callbackFn.apply(thisArg, this[i], i, this));
        }
    }
    return result;
}

/* Filter Polyfill */
Array.prototype.newFilter = function (callbackFn) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        if (callbackFn(this[i], i, this)) {
            // when true, added to result
            result.push(this[i]);
        }
    }
    return result;
}

/* Reduce Polyfill */
Array.prototype.newReduce = function (callbackFn, acc) {
    for (let i = 0; i < this.length; i++) {
        acc = callbackFn(acc, this[i], i, this);
    }
    return acc;
}

const result = arr.newReduce((acc, num) => {
    acc = acc + num;
    return acc;
}, 0);

console.log('result arr: ', result);