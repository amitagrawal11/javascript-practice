function MyPromise(executor) {
    const PROMISE_STATE = {
        PENDING: 0,
        FULFILLED: 1,
        REJECTED: 2,
    }

    this.value = null;
    this.thenHandlers = [];
    this.catchHandlers = [];
    let state = PROMISE_STATE.PENDING;

    /* Promise main methods resolve, reject */
    this.resolve = function (result) {
        if (this.state !== PROMISE_STATE.PENDING) {
            return;
        }

        this.value = result;
        this.state = PROMISE_STATE.FULFILLED;

        try {
            this.thenHandlers.forEach(promise => {
                this.value = promise(this.value);
                console.log('this.value: ', this.value);
            });

        } catch (e) {
            this.thenHandlers = [];
            this.reject(e);
        }
    };

    this.reject = function (error) {
        this.catchHandlers.push(error);
    };

    executor(this.resolve.bind(this), this.reject.bind(this));
}



// Promise static methods, then, catch and finally
MyPromise.prototype.then = function (sucessHandler, errorHandler) {
    this.thenHandlers.push(sucessHandler);
    this.catchHandlers.push(errorHandler);
    return this;
}

MyPromise.prototype.catch = function (errorHandler) {
    this.catchHandlers.push(errorHandler);
    return this;
}

MyPromise.prototype.finally = function (errorHandler) { };

// Promise main methods, race, all, allSettled
MyPromise.prototype.race = function (promises) { }
MyPromise.prototype.all = function (promises) { }
MyPromise.prototype.allSettled = function (promises) { }


module.exports = MyPromise;
