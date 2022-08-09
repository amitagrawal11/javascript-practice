class Person {
    name = "";
    age = null;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

class Employee extends Person {
    employerName = "";

    constructor(name, age, employer) {
        super(name, age);
        this.employerName = employer;
    }

    toString() {
        return `I ${this.name}, ${this.age} works at ${this.employerName}.`;
    }
}

const employee = new Employee("Amit", 30, "Precisely");

console.log('Employee name: ', employee.toString());