const Manager = require('../lib/manager');

describe('Manager', () => {
  describe('Initialization', () => {
    it("should create manager name, id, email, and office number", () => {
      const officeNumber = "403";
    //   const newEmployee = new Employee ("Alice", "1", "alice@gmail.com");
      const newManager = new Manager ("Alice", "1", "alice@gmail.com", officeNumber);
      expect(`${newManager.getRole()}`).toEqual(`<h1>Alice</h1> <p>Id: 1</p> <p>Email: alice@gmail.com</p> <p>Office: 403</p>`);
    })
  })
})

//passed the test