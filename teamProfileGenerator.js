const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const render = require('./generateHTML');
const addedEmployees = [];
const idArray = [];
  
const outputDirectory = path.resolve(__dirname, "output");
const outputPath = path.resolve(outputDirectory, "team-profile.HTML");

function createHTML() {
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory)
  };
  fs.writeFileSync(outputPath, render(addedEmployees), "utf-8")
};

function addMembers() {
  function askTypeOfEmployee() {
    inquirer.prompt([
      {
        type: 'list',
        message: 'What type of employee would you like to add?',
        choices: ['Manager', 'Engineer', 'Intern', 'I don\'t want to add another employee'],
        name: 'typeOfEmployee'
      }
    ]).then((response) => {
      switch (response.typeOfEmployee) {
        case 'Manager': 
          createManager();
          break;
        case 'Engineer':
          createEngineer();
          break;
        case 'Intern':
          createIntern();
          break;
        default:
          createHTML();
      }
    })
  };

  askTypeOfEmployee();
  
  function createManager() {
    inquirer.prompt([
      {
        type: 'input',
        message: 'What is the name of the employee?',
        name: 'name',
        validate: response => {
          if (response.name === "") {
            return "Please enter at least one character"
          } else {
            return true
          }
        }
      },
      {
        type: 'input',
        message: 'What is the id of the employee?',
        name: 'id',
        validate: response => {
          const validated = response.match(/^[0-9]\d*$/);
          if (validated) {
            if (idArray.includes(response)) {
              return "This ID is already taken. Please enter another ID."
            } else {
              return true
            }
          } else {
            return "Employee ID must be a valid number."
          }
        }
      },
      {
          type: 'input',
          message: 'What is the email of the employee?',
          name: 'email',
          validate: response => {
            const validated = response.match(/\S+@\S+\.\S+/);
            if (validated) {
              return true
            } else {
              return "Please enter a valid email."
            }
          }
      },
      {
        type: 'input',
        message: 'What is your office number?',
        name: 'office',
        validate: response => {
          const validated = response.match(/^[1-9]\d*$/);
          if (validated) {
            return true
          } else {
            return "Please enter a valid office number."
          }
        }
      },
    ]).then((response) => {
      const manager = new Manager(response.name, response.id, response.email, response.office);
      addedEmployees.push(manager);
      idArray.push(response.id);
      addMembers();
    })
  };

  function createEngineer() {
    inquirer.prompt([
      {
        type: 'input',
        message: 'What is the name of the employee?',
        name: 'name',
        validate: response => {
          if (response === "") {
            return "Please enter at least one character"
          } else {
            return true
          }
        }
      },
      {
        type: 'input',
        message: 'What is the id of the employee?',
        name: 'id',
        validate: response => {
          const validated = response.match(/^[0-9]\d*$/);
          if (validated) {
            return true
          } else {
            return "Employee ID must be a valid number."
          }
        }
      },
      {
          type: 'input',
          message: 'What is the email of the employee?',
          name: 'email',
          validate: response => {
            const validated = response.match(/\S+@\S+\.\S+/);
            if (validated) {
              if (idArray.includes(response)) {
                return "This ID is already taken. Please enter another ID."
              } else {
                return true
              }
            } else {
              return "Please enter a valid email."
            }
          }
      },
      {
        type: 'input',
        message: 'What is your GitHub username?',
        name: 'github',
        validate: response => {
          if (response.name === "") {
            return "Please enter at least one character"
          } else {
            return true
          }
        }
      },
    ]).then((response) => {
      const engineer = new Engineer(response.name, response.id, response.email, response.github);
      addedEmployees.push(engineer);
      idArray.push(response.id);
      addMembers();
    })
  };

  function createIntern() {
    inquirer.prompt([
      {
        type: 'input',
        message: 'What is the name of the employee?',
        name: 'name',
        validate: response => {
          if (response === "") {
            return "Please enter at least one character"
          } else {
            return true
          }
        }
      },
      {
        type: 'input',
        message: 'What is the id of the employee?',
        name: 'id',
        validate: response => {
          const validated = response.match(/^[0-9]\d*$/);
          if (validated) {
            if (idArray.includes(response)) {
              return "This ID is already taken. Please enter another ID."
            } else {
              return true
            }
          } else {
            return "Employee ID must be a valid number."
          }
        }
      },
      {
          type: 'input',
          message: 'What is the email of the employee?',
          name: 'email',
          validate: response => {
            const validated = response.match(/\S+@\S+\.\S+/);
            if (validated) {
              return true
            } else {
              return "Please enter a valid email."
            }
          }
      },
      {
        type: 'input',
        message: 'What is your school name?',
        name: 'school',
        validate: response => {
          if (response === "") {
            return "Please enter at least one character"
          } else {
            return true
          }
        }
      },
    ]).then((response) => {
      const intern = new Intern(response.name, response.id, response.email, response.school);
      addedEmployees.push(intern);
      idArray.push(response.id);
      addMembers();
    })
  }
};

addMembers();