function Person(name) {
    this.name = name;
}

function Employee() {
    Person.call(this, "hitesh");
}


// new way 
// Object.setPrototypeOf(Employee.prototype, Person.prototype);

// old way 
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Person;

const emp = new Employee();
console.log('employee name: ' + emp.name);


/* Class Based Inheritance */

class Base {
    constructor(value) {
        this.value = value;
    }
}
class Derived extends Base {
    constructor(value) {
        super(value);
    }
}
// class based inheritance
const derived = new Derived();

