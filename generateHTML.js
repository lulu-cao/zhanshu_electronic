const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const Manager = require('./lib/manager');

function addEmployeeByType(response) {
  function addManager(response) {
      const newManager = new Manager (response.name, response.id, response.email, response.office);
      return `<div class="row">
              <div class="col">
                <div class="card" style="width: 18rem;">
                  <div class="card-body">
                    ${newManager.getRole()}
                  </div>
                </div>
              </div>
            </div>
      `
  };

  function addEngineer(response) {
      const newEngineer = new Engineer (response.name, response.id, response.email, response.github);
      return `<div class="row">
              <div class="col">
                <div class="card" style="width: 18rem;">
                  <div class="card-body">
                    ${newEngineer.getRole()}
                  </div>
                </div>
              </div>
            </div>
      `
  };

  function addIntern(response) {
      const newIntern = new Intern (response.name, response.id, response.email, response.school);
      return `<div class="row">
              <div class="col">
                <div class="card" style="width: 18rem;">
                  <div class="card-body">
                    ${newIntern.getRole()}
                  </div>
                </div>
              </div>
            </div>
      `
  };

  const html = [];
  html.push(response
    .filter(employee => employee.getRole === "Manager")
    .map(manager => addManager(manager)));
  
  html.push(response
    .filter(employee => employee.getRole === "Engineer")
    .map(engineer => addEngineer(engineer)));

  html.push(response
    .filter(employee => employee.getRole === "Intern")
    .map(intern => addIntern(intern)));
};

function generateHTML(response) {
    return `<!DOCTYPE html>
<html lang="us">

<head>
    <title>Team Profile</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width initial-scale=1">
    <!-- bootstrap-css-cdn -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>

<body>
    <main>
      <br/>
      <div class="container">
        <h1>Team Profile</h1>
          ${addEmployeeByType(response)};
        </div>     
      </div>
    </main>
    
    <!-- bootstrap bundle with popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>
`
};

module.exports = response => {generateHTML(response)};