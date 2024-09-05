const $ = document;
const imgContainer = $.querySelector(".container");
const img = $.querySelector("img");

imgContainer.addEventListener("mousemove", (event) => {
  const xPosition = event.clientX - event.target.offsetLeft;
  const yPosition = event.clientY - event.target.offsetTop;

  img.style.transformOrigin = `${xPosition}px ${yPosition}px`;
  img.style.transform = "scale(2)";
});

imgContainer.addEventListener("mouseleave", () => {
  img.style.transformOrigin = "center";
  img.style.transform = "scale(1)";
});
