const $ = document;
const resultElem = $.getElementById("result");
const searchBtn = $.getElementById("search-btn");
const inputElem = $.getElementById("inp-word");
const audio = $.getElementById("sound");

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

searchBtn.addEventListener("click", () => {
  let inputWord = inputElem.value;

  fetch(`${url}${inputWord}`)
    .then((res) => res.json())
    .then((data) => {
      let dataS = data[0];
      console.log(dataS);

      resultElem.innerHTML = `<div class="word">
          <h3>${dataS.word}</h3>
          <button onclick="playSound()">
            <i class="fas fa-volume-up" ></i>
          </button>
        </div>
        <div class="details">
          <p>${dataS.meanings[0].partOfSpeech}</p>
          <p>${dataS.phonetic}</p>
        </div>
        <p class="word-meaning">
            ${dataS.meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
            ${dataS.meanings[0].definitions[0].example || ""}
        </p>`;

      audio.setAttribute("src", dataS.phonetics[1].audio);
    })
    .catch(() => {
      resultElem.innerHTML = `<h3 class="error">There is No such Word</h3>`;
    });
});

function playSound() {
  audio.play();
}
