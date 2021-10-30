//set up dropdown menu for navbar
let dropdownBtn = document.querySelector(".dropdownbtn");
let myDropdown = document.getElementById("myDropdown");
dropdownBtn.addEventListener("click", dropdownClicked);
function dropdownClicked() {
    myDropdown.classList.toggle("show");
};

window.onclick = function dropdownNotClicked(event) {
    if (!event.target.matches('.dropdownbtn')) {
        let dropdownContent = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdownContent.length; i++) {
          let openDropdown = dropdownContent[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
};

//set up the contact page
var nameInput = document.querySelector("#name");
var emailInput = document.querySelector("#email");
var submitEl = document.querySelector("#submit");
var ResponseEl = document.querySelector("#response");

function showResponse(event) {
    event.preventDefault();
    var voidResponse = "Please enter your name and email.";
    if (nameInput.value.length == 0 || emailInput.value.length == 0) {
        ResponseEl.textContent = voidResponse;
    } else {
    var response = "Thank you for your submission, " + nameInput.value + ". We will reach out to you at " + emailInput.value + ".";
    ResponseEl.textContent = response;
    }
}

submitEl.addEventListener("click", showResponse);