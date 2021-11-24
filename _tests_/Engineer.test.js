const Engineer = require('../lib/engineer');

describe('Manager', () => {
  describe('Initialization', () => {
    it("should create intern name, id, email, and school", () => {
      const github = "username";
    //   const newEmployee = new Employee ("Alice", "1", "alice@gmail.com");
      const newEngineer = new Engineer ("Alice", "1", "alice@gmail.com", github);
      expect(`${newEngineer.getRole()}`).toEqual(`<h1>Alice</h1> <p>Id: 1</p> <p>Email: alice@gmail.com</p> <p>Github: username</p>`);
    })
  })
})

//passed the test