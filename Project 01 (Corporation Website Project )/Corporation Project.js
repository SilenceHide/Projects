const navBtn = document.querySelector(".nav__btn");
const navMenu = document.querySelector(".nav-menu");

let navOpen = false;

navBtn.addEventListener("click", function () {
  if (navOpen) {
    navBtn.classList.remove("nav__btn--open");
    navMenu.style.left = "-25.1rem";
    navOpen = false;
  } else {
    navBtn.classList.add("nav__btn--open");
    navMenu.style.left = "0";
    navOpen = true;
  }
});

// ----- My Code (Also Works) -----///
// navBtn.addEventListener("click", function () {
//   if (navBtn.className.includes("nav__btn--open")) {
//     navBtn.classList.remove("nav__btn--open");
//   } else {
//     navBtn.classList.add("nav__btn--open");
//   }
// });
