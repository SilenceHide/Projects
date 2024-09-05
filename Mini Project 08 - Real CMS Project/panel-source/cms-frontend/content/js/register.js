const $ = document;
const firstNameInput = $.getElementById("firstname-input");
const lastNameInput = $.getElementById("lastname-input");
const usernameInput = $.getElementById("username-input");

const firstNameMessage = $.getElementById("firstname-message");
const lastNameMessage = $.getElementById("lastname-message");
const usernameMessage = $.getElementById("username-message");
const submitBtn = $.getElementById("submit-btn");

let firstNameValid,
  lastNameValid,
  usernameValid = null;

firstNameInput.addEventListener("keypress", (event) => {
  if (event.target.value.length < 2) {
    firstNameMessage.innerHTML = "First Name Is Not Valid";
    firstNameMessage.classList.remove("valid-message");
    firstNameMessage.classList.add("invalid-message");
    firstNameValid = false;
  } else {
    firstNameMessage.innerHTML = "First Name Is Valid";
    firstNameMessage.classList.remove("invalid-message");
    firstNameMessage.classList.add("valid-message");
    firstNameValid = true;
  }
});

lastNameInput.addEventListener("keypress", (event) => {
  if (event.target.value.length < 3) {
    lastNameMessage.innerHTML = "last Name Is Not Valid";
    lastNameMessage.classList.remove("valid-message");
    lastNameMessage.classList.add("invalid-message");
    lastNameValid = false;
  } else {
    lastNameMessage.innerHTML = "last Name Is Valid";
    lastNameMessage.classList.remove("invalid-message");
    lastNameMessage.classList.add("valid-message");
    lastNameValid = true;
  }
});

usernameInput.addEventListener("keypress", (event) => {
  if (event.target.value.length < 6) {
    usernameMessage.innerHTML = "last Name Is Not Valid";
    usernameMessage.classList.remove("valid-message");
    usernameMessage.classList.add("invalid-message");
    usernameValid = false;
  } else {
    usernameMessage.innerHTML = "last Name Is Valid";
    usernameMessage.classList.remove("invalid-message");
    usernameMessage.classList.add("valid-message");
    usernameValid = true;
  }
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (firstNameValid && lastNameValid && usernameValid) {
    let newUserData = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      userName: usernameInput.value,
      profile: "content/img/profile/banana.png",
    };

    fetch("http://127.0.0.1:4000/api/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newUserData),
    }).then((res) => {
      console.log(res);
      clearInputs();
    });
  } else {
    alert("Please, Fill The Inputs Correctly Mofos");
  }
});

function clearInputs() {
  firstNameInput.value = "";
  lastNameInput.value = "";
  usernameInput.value = "";

  firstNameInput.focus();
}
