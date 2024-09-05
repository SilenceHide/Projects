const $ = document;
const searchBtnElem = $.querySelector("button");
const searchInputElem = $.querySelector("input");
const paragraphElem = $.getElementById("paragraph");

const search = () => {
  let searchInputElemValue = searchInputElem.value;
  //   let searchRegex = `/${searchInputElemValue}/g`;
  let searchRegex = new RegExp(`${searchInputElemValue}`, "gi");

  paragraphElem.innerHTML = paragraphElem.textContent.replace(
    searchRegex,
    (item) => `<mark>${item}</mark>`
  );
};

const searchKey = (e) => {
  console.log(e);
  if (e.code === "Enter") {
    let searchInputElemValue = searchInputElem.value;
    //   let searchRegex = `/${searchInputElemValue}/g`;
    let searchRegex = new RegExp(`${searchInputElemValue}`, "gi");

    paragraphElem.innerHTML = paragraphElem.textContent.replace(
      searchRegex,
      (item) => `<mark>${item}</mark>`
    );
  }
};

searchBtnElem.addEventListener("click", search);

searchInputElem.addEventListener("keypress", searchKey);
