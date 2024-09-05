const $ = document;
const usernameInput = $.getElementById("username-input");
const passwordInput = $.getElementById("password-input");
const submitLoginBtn = $.querySelector(".submit-form-btn");

submitLoginBtn.addEventListener("click", (event) => {
  event.preventDefault();

  let adminID = null;

  let adminUserName = usernameInput.value;
  let adminPassword = passwordInput.value;

  fetch("http://127.0.0.1:4000/api/admins")
    .then((res) => res.json())
    .then((admins) => {
      console.log(admins);

      let isAdmin = admins.some((admin) => {
        if (
          admin.username === adminUserName &&
          admin.password === adminPassword
        ) {
          adminID = admin._id;
          return (
            admin.username === adminUserName && admin.password === adminPassword
          );
        }
      });

      if (isAdmin) {
        localStorage.setItem("loginID", adminID);
        location.href =
          "http://127.0.0.1:5500/cms-frontend/panel-change-info.html";
        clearInput();
      } else {
        alert("Your Info is Wrong");
        clearInput();
      }
    });
});

function clearInput() {
  usernameInput.value = "";
  passwordInput.value = "";
}
