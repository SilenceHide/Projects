const $ = document;
const firstNameInput = $.getElementById("first-name-input");
const lastNameInput = $.getElementById("last-name-input");
const usernameInput = $.getElementById("username-input");
const newPasswordInput = $.getElementById("new-password-input");
const confirmPasswordInput = $.getElementById("confirm-password-input");
const emailInput = $.getElementById("email-input");

const updateInfoBtn = $.querySelector(".submit-change-info-btn");

const logoutBtn = $.querySelector(".sign-out-btn");

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  location.href = "http://127.0.0.1:5500/cms-frontend/login.html";
});

window.addEventListener("load", () => {
  let adminID = localStorage.getItem("loginID");

  if (!adminID) {
    location.href = "http://127.0.0.1:5500/cms-frontend/login.html";
  }

  fetch(`http://127.0.0.1:4000/api/admins/${adminID}`)
    .then((res) => res.json())
    .then((mainAdmin) => {
      console.log(mainAdmin);

      firstNameInput.value = mainAdmin.firstName;
      lastNameInput.value = mainAdmin.lastName;
      usernameInput.value = mainAdmin.username;
      emailInput.value = mainAdmin.email;

      document.title = `Panel - ${mainAdmin.firstName} ${mainAdmin.lastName}`;
    });
});

updateInfoBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (newPasswordInput.value === confirmPasswordInput.value) {
    let adminID = localStorage.getItem("loginID");

    let adminNewInfos = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      username: usernameInput.value,
      password: confirmPasswordInput.value,
      email: emailInput.value,
    };

    fetch(`http://127.0.0.1:4000/api/admins/${adminID}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(adminNewInfos),
    }).then((res) => {
      console.log(res);
    });
  } else {
    alert("Your Passwords are Different");
  }
});
