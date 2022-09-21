

let obj = {
    firstName: "Amit",
    lastName: "Agrawal"
}

Function.prototype.myBind = function (ctx, ...args) {
    let fn = this;
    return function (...args2) {
        return fn.apply(ctx, [...args, ...args2]);
    }
}

Function.prototype.myCall = function (ctx, ...args) {
    ctx.myFn = this;
    return ctx.myFn(...args);
}

Function.prototype.myApply = function (ctx, args) {
    ctx.myFn = this;
    return ctx.myFn(...args);
}

function printDetails(city, state) {
    return `My name is ${this.firstName} ${this.lastName} and I belong to ${city}, ${state}`;
}

console.log(printDetails.myCall(obj, "Aligarh", "UP"));
console.log(printDetails.myApply(obj, ["Aligarh", "UP"]));
