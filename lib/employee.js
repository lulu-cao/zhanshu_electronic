class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        console.log(this.name);
        return `<h5 class="card-title">${this.name}</h5>`;
    }

    getId() {
        console.log(this.id);
        return `<p class="card-text">Id: ${this.id}</p>`;
    }

    getEmail() {
        console.log(this.email);
        return `<p>Email: <a href=\"mailto:${this.email}\">${this.email}</a></p>`;
    }

    getRole() {
        console.log(this.getName(), this.getId(), this.getEmail());
        return `${this.getName()} ${this.getId()} ${this.getEmail()}`
    }
}

module.exports = Employee;

//passed the test


