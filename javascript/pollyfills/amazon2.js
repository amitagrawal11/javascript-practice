let promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('resolved promise value');
    });
});

promise
    .then((res) => { return 'resolved' }) // return promise
    .then((res) => { });

promise.catch((err) => { });

// then, catch

// skip, all static method 

// states PENDING, FULLFILLED, REJECTED

class MyPromise {
    constructor(executor) {
        if (toString.call(executor) !== '[object Function]') {
            throw new Error('Executor is not a function');
        }

        this.thenableChain = [];
        this.handleError = function () { }        // array of catch

        // TODO: make sure private members
        this.onResolve = this.onResolve.bind(this);
        this.onReject = this.onReject.bind(this);

        executor(this.onResolve, this.onReject);
    }

    then(successFn, errorFn) {
        this.thenableChain.push(successFn);
        return this;
    };

    catch(errorFn) {
        this.handleError = errorFn;
        return this;
    };

    onResolve(value) {
        let accumulator = value;

        try {
            // all promises
            this.thenableChain.forEach(cbFn => {
                accumulator = cbFn(accumulator);
            });
        } catch (error) {
            this.onReject(error);
        }
    }

    onReject(error) {
        return this.handleError(error);
    }
}



functinal requirements:

- no inventory means - date should be disabled
    - inventory
    - two weeks 


API Contracts:

/getInventorySlots 

    - pagination - business - create subset of data
        - date
        - slots - array
        - slot {
    startHour: number
    endHour: number
    notation: <AM /PM >,
        timezone: "",       // ISO/UTC format 
}


responseObject = [
    {
        year: <number>,
            month: <number>,
                date: <number>,
                    timezone: "",       // ISO/UTC format
                    active: <boolean true /false>,
                    slots: [
                    {
                        startHour: <number>,
                            endHour: <number>,
                                notation: <AM /PM>,
                            activeSlot: <true /false>
            }
                            ]       
    }
                            ];

                            // table
                            // flex
                            // grid


                            right-item2 left-item1

                            section - group

                            <section class="calendar">
                                <h1> {Month} </h1>
                                <section class="calendar__days__container">     // flex box - flex: 1
                                    <section class="calendar__week__name">

                                    </section>
                                    <section class="calendar__week__date"></section>
                                    <section class="calendar__week__date"></section>
                                </section>
                                <section class="calendar__show-more">
        // flex-end
                                    <section>
                                        <a href="">Show more</a>        // ::after icon
                                        <span class="link-icon">

                                    </section>
                                </section>
                            </section>


















