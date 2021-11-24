const Employee = require('./employee');

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    };

    getOfficeNum() {
        return `<p>Office: ${this.officeNumber}</p>`
    };

    getRole() {
        console.log(super.getRole(), this.getOfficeNum());
        return `${super.getRole()} ${this.getOfficeNum()}`
    };
};

module.exports = Manager;

//passed the test