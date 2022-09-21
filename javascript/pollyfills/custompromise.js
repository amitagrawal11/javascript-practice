const state = {
    "pending": 0,
    "fullfilled": 1,
    "rejected": 2
}

class CustomPromise {
    constructor(executor) {
        this.promiseChain = [];
        this.handleError = () => { };

        this.onResolve = this.onResolve.bind(this);
        this.onReject = this.onReject.bind(this);

        executor(this.onResolve, this.onReject);
    }

    then(handleSuccess) {
        this.promiseChain.push(handleSuccess);
        return this;
    }
    catch(handleError) {
        this.handleError = handleError;
        return this;
    }

    onResolve(value) {
        let storedValue = value;
        try {
            this.promiseChain.forEach((nextFn) => {
                storedValue = nextFn(storedValue);
            });
        } catch (error) {
            this.promiseChain = [];
            this.onReject(error);
        }
    }
    onReject(error) {
        this.handleError(error);
    }
}


const promise = new Promise((resolve, reject) => {
    console.log('promise is executing');
    setTimeout(() => {
        // resolve('resolved promise');
        reject('promise rejected');
    }, 3000);
});

promise.then((response) => {
    console.log('PROMISE RESOLVED WITH VALUE: ' + response);
    return "another response";
})
    .then((response) => {
        console.log('2 PROMISE RESOLVED WITH VALUE: ' + response);
    })
    .catch((error) => {
        console.log('PROMISE ERROR CAUGHT: ' + error);
    })
    .then((response) => {
        console.log('3 PROMISE RESOLVED WITH VALUE: ' + response);
    });

// console.log('Static method: ', CustomPromise.resolve('test'));

console.log('END');













