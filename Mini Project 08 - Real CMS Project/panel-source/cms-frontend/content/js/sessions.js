import "./shared.js";

const $ = document;
const sessionsNameInput = $.getElementById("session-name-input");
const sessionsTimeInput = $.getElementById("session-time-input");
const sessionsPriceInput = $.getElementById("session-price-input");
const sessionsDropDown = $.getElementById("");

const addNewSessionBtn = $.getElementById("add-new-session-btn");
const coursesParentDropdown = $.getElementById("courses-parent-dropdown");
const mainCourseElem = $.getElementById("main-course");

let allCoursesListItems = $.querySelectorAll(".session-dropdown-menu-item");

const sessionsContainer = $.querySelector(".sessions");
const removeSessionModal = $.querySelector(".remove-modal");

const logoutBtn = $.querySelector(".sign-out-btn");

let mainSessionID = null;

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  location.href = "http://127.0.0.1:5500/cms-frontend/login.html";
});

allCoursesListItems.forEach((course) => {
  course.addEventListener("click", (event) => {
    mainCourseElem.innerHTML = event.target.innerHTML;
  });
});

addNewSessionBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  let newSessionData = {
    title: sessionsNameInput.value,
    time: sessionsTimeInput.value,
    isFree: !Boolean(sessionsPriceInput.value),
    course: mainCourseElem.innerText,
  };

  await fetch("http://127.0.0.1:4000/api/sessions", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newSessionData),
  }).then((res) => {
    console.log(res);
    clearInputs();
    getAllSessions();
  });
});

function clearInputs() {
  sessionsNameInput.value = "";
  sessionsTimeInput.value = "";
  sessionsPriceInput.value = "";
  mainCourseElem.innerHTML = "Course";
}

coursesParentDropdown.addEventListener("click", () => {
  coursesParentDropdown.classList.add("active");
});

window.addEventListener("click", (event) => {
  if (event.target.id !== "courses-parent-dropdown") {
    coursesParentDropdown.classList.remove("active");
  }
});

function getAllSessions() {
  fetch("http://127.0.0.1:4000/api/sessions")
    .then((res) => res.json())
    .then((sessions) => {
      console.log(sessions);

      sessionsContainer.innerHTML = "";

      sessions.forEach((session) => {
        sessionsContainer.insertAdjacentHTML(
          "beforeend",
          `<div class="session-box">
                  <div>
                    <h1 class="session-name-title">${session.title}</h1>
                    <span class="session-category">${session.course}</span>
                  </div>
                  <div>
                    <span class="session-price-badge">${
                      session.isFree ? "Free" : "Not Free"
                    }</span>
                    <span class="session-time">${session.time} min</span>
                    <span style="cursor: pointer;" onclick="showRemoveModal('${
                      session._id
                    }')">X</span>
                  </div>
                </div>`
        );
      });
    });
}

function showRemoveModal(sessionID) {
  mainSessionID = sessionID;

  removeSessionModal.classList.add("visible");
}

function closeRemoveModal() {
  removeSessionModal.classList.remove("visible");
}

function removeSession() {
  fetch(`http://127.0.0.1:4000/api/sessions/${mainSessionID}`, {
    method: "DELETE",
  }).then((res) => {
    console.log(res);
    closeRemoveModal();
    getAllSessions();
  });
}

window.addEventListener("load", getAllSessions());
