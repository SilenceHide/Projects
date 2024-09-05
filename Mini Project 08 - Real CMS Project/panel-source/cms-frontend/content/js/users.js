import "./shared.js";

const $ = document;
const usersWrapper = $.querySelector(".users-wrap");
const removeModal = $.querySelector(".remove-modal");
const editModal = $.querySelector(".edit-modal");

const usernameInput = $.getElementById("username-input");
const firstNameInput = $.getElementById("first-name-input");
const lastNameInput = $.getElementById("last-name-input");

const logoutBtn = $.querySelector(".sign-out-btn");

let mainUserID = null;

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  location.href = "http://127.0.0.1:5500/cms-frontend/login.html";
});

window.addEventListener("load", getAllUsers);

function getAllUsers() {
  fetch("http://127.0.0.1:4000/api/users")
    .then((res) => res.json())
    .then((data) => {
      usersWrapper.innerHTML = "";

      data.forEach((user) => {
        usersWrapper.insertAdjacentHTML(
          "beforeend",
          `<div class="user-box">
                <div class="user-box_left">
                  <img src="${user.profile}" class="user-profile-box" alt="">
                  <div class="user-detail">
                    <h1 class="user-id">
                      <span>${user.userName}</span>
                      <span class="user-history">${user.created_AT}</span>
                    </h1>
                    <h3 class="user-name">
                      ${user.firstName} ${user.lastName}
                    </h3>
                  </div>
                </div>

                <div class="user-btns-group">
                  <!-- ! ------------------------------ edit btn ------------------------------- ! -->
                  <button onclick="showEditModal('${user._id}')" class="user-edit-btn">edit</button>
                  <!-- ! ----------------------------- remove btn ------------------------------ ! -->
                  <button onclick="showModal('${user._id}')" class="user-remove-btn">remove</button>
                </div>
              </div>`
        );
      });
    });
}

function showModal(userID) {
  mainUserID = userID;
  removeModal.classList.add("visible");
}

function closeModal() {
  removeModal.classList.remove("visible");
}

function removeUser() {
  fetch(`http://127.0.0.1:4000/api/users/${mainUserID}`, {
    method: "DELETE",
  }).then((res) => {
    console.log(res);
    closeModal();
    getAllUsers();
  });
}

function showEditModal(userID) {
  editModal.classList.add("visible");
  mainUserID = userID;
}

function closeEditModal() {
  editModal.classList.remove("visible");
}

function updateUser(event) {
  event.preventDefault();
  let newUserData = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    userName: usernameInput.value,
    profile: "content/img/profile/banana.png",
  };

  fetch(`http://127.0.0.1:4000/api/users/${mainUserID}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newUserData),
  }).then((res) => {
    console.log(res);
    closeEditModal();
    clearEditModalInputs();
    getAllUsers();
  });
}

function clearEditModalInputs() {
  firstNameInput.value = "";
  lastNameInput.value = "";
  usernameInput.value = "";
}

window.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    closeEditModal();
  }
});
