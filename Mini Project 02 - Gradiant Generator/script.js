const $ = document;
const firstColorInput = $.getElementById("color-a");
const secondColorInput = $.getElementById("color-b");
const directions = $.querySelectorAll(".buttons button");
const generateBtn = $.getElementById("submit");
const codeTextArea = $.getElementById("code");
const copyBtn = $.getElementById("copy");

let currentDirection = "to bottom";

const setDirection = (direction, activation) => {
  for (let item of directions) {
    item.classList.remove("active");
  }

  if (activation.tagName === "BUTTON") {
    activation.classList.add("active");
  } else {
    activation.parentElement.classList.add("active");
  }

  currentDirection = direction;
};

const generateCssCode = () => {
  let cssCode = `background: linear-gradient(${currentDirection},${firstColorInput.value},${secondColorInput.value})`;

  codeTextArea.value = cssCode;

  document.body.style.cssText = cssCode;
};

const copyCssCode = () => {
  codeTextArea.select();
  document.execCommand("copy");

  alert("CSS Codes Copied (;");
};

directions.forEach((direction) => {
  direction.addEventListener("click", (event) => {
    let direction = event.target.dataset.direction;
    let activation = event.target;

    setDirection(direction, activation);
  });
});

generateBtn.addEventListener("click", generateCssCode);
copyBtn.addEventListener("click", copyCssCode);

generateCssCode();
