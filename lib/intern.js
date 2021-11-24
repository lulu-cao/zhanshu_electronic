const Employee = require('./employee');

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    getSchool() {
        console.log(this.school);
        return `<p>School: ${this.school}</p>`
    };

    getRole() {
        return `${super.getRole()} ${this.getSchool()}`
    }
};

module.exports = Intern; 

//passed the test