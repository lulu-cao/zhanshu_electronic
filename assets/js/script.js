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