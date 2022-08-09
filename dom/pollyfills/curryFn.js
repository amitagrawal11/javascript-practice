/* 
    Implementation of curry function in javascript

    function curry(1)(2)(3)
*/

function curry(fn) {
    return function curried(...args) {
        if (fn.length !== args.length) {
            return curried.bind(this, ...args);
        }
        return fn.call(null, ...args);
    }
}

function curryAdvanced(fn) {
    return function curried(...args1) {
        if (args1.length >= fn.length) {
            return fn.apply(this, args1);
        } else {
            return function (...args2) {
                return curried.apply(this, args1.concat(args2));
            }
        }
    }
}

/* Infinite Curry */
let sum = function (a) {
    return function (b) {
        if (b) return sum(a + b);
        return a;
    }
}

// const sum3 = (x, y, z) => x + y + z;
// const sum4 = (x, y, z, a) => a + x + y + z;
// const sumN = (...args) => args.reduce((acc, num) => acc = (acc + num), 0);
// const sumN = x => (y = 0) => (...z) => +x + +y + +z.reduce((prev, curr) => prev + curr, 0)

// const curried = curry(sumN);
// const curriedAdvance = curryAdvanced(sum4);


console.log('curry function: ', sum(1)(2)(3)(4)());