const Employee = require('./employee');

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    };

    getGithub() {
        console.log(this.github);
        return `<p>Github: <a href=\"${this.github}\">${this.github}</a></p>`
    };

    getRole() { 
        return `${super.getRole()} ${this.getGithub()}`
    }
};

module.exports = Engineer;

//passed the test