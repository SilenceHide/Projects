const $ = document;
const addBox = $.querySelector(".add-box"),
  popupBox = $.querySelector(".popup-box "),
  popupTitle = $.querySelector("header p"),
  popupClose = $.querySelector("header i"),
  inputElem = $.querySelector("input"),
  textareaElem = $.querySelector("textarea"),
  buttonElem = $.querySelector("button"),
  wrapperElem = $.querySelector(".wrapper");

let isUpdate = false;
let updateID = null;

let notes = [];

addBox.addEventListener("click", showModal);

function showModal(noteTitle, noteDescription) {
  if (isUpdate) {
    popupTitle.innerHTML = "Update main note";
    buttonElem.innerHTML = "Update Note";

    inputElem.value = noteTitle;
    textareaElem.value = noteDescription;
  } else {
    popupTitle.innerHTML = "Add a new note";
    buttonElem.innerHTML = "Add Note";
  }
  inputElem.focus();
  popupBox.classList.add("show");
}

buttonElem.addEventListener("click", () => {
  if (isUpdate) {
    let allNotes = getLocalStorageNotes();

    allNotes.some((note, index) => {
      if (index === updateID) {
        note.title = inputElem.value;
        note.description = textareaElem.value;
      }
    });

    setNotesInLocalStorage(allNotes);
    generateNotes(allNotes);
    closeModal();
    clearInputs();
    isUpdate = false;
  } else {
    let newNote = {
      title: inputElem.value,
      description: textareaElem.value,
      date: getDate(),
    };

    notes.push(newNote);
    setNotesInLocalStorage(notes);
    closeModal();
    generateNotes(notes);
    clearInputs();
  }
});

function getDate() {
  let now = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let today = now.getDay();
  let thisMonth = now.getMonth();
  let thisYear = now.getFullYear();
  let dayOfMonth = now.getDate();

  return `${months[thisMonth]} ${dayOfMonth},${thisYear} (${days[today]})`;
}

function clearInputs() {
  inputElem.value = "";
  textareaElem.value = "";
}

function generateNotes(notes) {
  $.querySelectorAll(".note").forEach((note) => note.remove());

  notes.forEach((note, index) => {
    wrapperElem.insertAdjacentHTML(
      "beforeend",
      `
        <li class="note">
        <div class="details">
          <p>${note.title}</p>
          <span>${note.description}</span>
        </div>
        <div class="bottom-content">
          <span>${note.date}</span>
          <div class="settings">
            <i class="uil uil-ellipsis-h" onclick="showSetting(this)"></i>
            <ul class="menu">
              <li onclick="editNoTe(${index},'${note.title}','${note.description}')">
                <i class="uil uil-pen"></i>Edit
              </li>
              <li onclick="removeNote(${index})">
                <i class="uil uil-trash"></i>Delete
              </li>
            </ul>
          </div>
        </div>
      </li>
        `
    );
  });
}

function removeNote(noteIndex) {
  let deleted = confirm("Are You Sure You Want To Delete This Note?");

  if (deleted) {
    let localNotes = getLocalStorageNotes();
    localNotes.splice(noteIndex, 1);

    setNotesInLocalStorage(localNotes);
    generateNotes(localNotes);
  }
}

function editNoTe(noteID, noteTitle, noteDescription) {
  isUpdate = true;
  showModal(noteTitle, noteDescription);

  updateID = noteID;
}

function showSetting(el) {
  el.parentElement.classList.add("show");

  document.addEventListener("click", (event) => {
    if (event.target.tagName !== "I" || event.target !== el) {
      el.parentElement.classList.remove("show");
    }
  });
}

function getLocalStorageNotes() {
  let localStorageNotes = localStorage.getItem("notes");

  if (localStorageNotes) {
    notes = JSON.parse(localStorageNotes);
  } else {
    notes = [];
  }

  return notes;
}

function setNotesInLocalStorage(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function closeModal() {
  popupBox.classList.remove("show");
}

popupClose.addEventListener("click", closeModal);

window.addEventListener("load", () => {
  let notes = getLocalStorageNotes();
  generateNotes(notes);
});

window.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});
