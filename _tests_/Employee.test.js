const Employee = require('../lib/employee');

describe('Employee', () => {
  describe('Initialization', () => {
    it("should create employee name, id, and email", () => {
      const newEmployee = new Employee ("Alice", "1", "alice@gmail.com");
      expect(`${newEmployee.getRole()}`).toEqual(`<h1>Alice</h1> <p>Id: 1</p> <p>Email: alice@gmail.com</p>`);
    })
  })
})

//passed the test