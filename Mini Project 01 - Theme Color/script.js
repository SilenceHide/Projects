const $ = document;
const themeCssVariables = $.querySelector(":root");
const colorBtns = $.querySelectorAll(".btn");

colorBtns.forEach((colorBtn) => {
  colorBtn.addEventListener("click", (event) => {
    let mainThemeColor = event.target.dataset.color;

    themeCssVariables.style.setProperty("--theme-color", mainThemeColor);
  });
});
