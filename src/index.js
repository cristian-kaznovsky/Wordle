const word_url = "https://words.dev-apis.com/word-of-the-day?random=1";
const check_url = "https://words.dev-apis.com/validate-word";
let letter_index = 1;
let row_index = 1;
let my_word = "";
let row_pos = document.querySelector(
  `.puzzle-container .puzzle-row:nth-child(${row_index})`
);
let letter_pos = row_pos.querySelector(
  `.puzzle-row :nth-child(${letter_index})`
);
const loader = document.querySelector(`.loader`);
const ANSWER_LENGTH = 5;
let message = document.querySelector(`.message`);
let sticky = false;
let lives = 6;
let done = false;
let wordApi;
let wordJson;
let secretWord;

async function init() {
  wordApi = await fetch(word_url);
  wordJson = await wordApi.json();
  secretWord = wordJson.word;
  //console.log(secretWord, wordJson.puzzleNumber);
}
init();
function insertLetter(event) {
  if (done === false) {
    if (isLetter(event.key) && letter_index <= 5 && sticky == false) {
      letter_pos.innerHTML = event.key.toUpperCase();
      letter_pos.style.color = "black";
      letter_index += 1;
      updateLetter(letter_index);
      my_word += event.key.toUpperCase();
    } else if (
      event.key === "Enter" &&
      letter_index == 6 &&
      sticky == false &&
      row_index < 7
    ) {
      sticky = true;
      loadSpinner(true);
      checkWord(my_word);
    } else if (event.key === "Backspace" && letter_index > 1) {
      my_word = my_word.slice(0, my_word.length - 1);
      letter_index -= 1;
      updateLetter(letter_index);
      letter_pos.style.color = "white";
    }
  }
}

async function checkWord(typedWord) {
  typedWord = typedWord.toLowerCase();
  const data = { word: typedWord };
  //console.log(JSON.stringify(data));
  const valid = await fetch(check_url, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const processedResponse = await valid.json();
  wordFeedback(processedResponse.validWord, typedWord);
}

function loadSpinner(status) {
  if (status === true) {
    loader.classList.remove("loader-hidden");
  } else {
    loader.classList.add("loader-hidden");
  }
}

async function wordFeedback(validation, typedWord) {
  //console.log(secretWord, wordJson.puzzleNumber);
  if (validation === false) {
    changeBorder(false);
  } else if (validation === true) {
    if (typedWord === secretWord) {
      message.innerHTML = "You Win!";
      message.style.color = "#00a648";
      done = true;
    } else if (lives == row_index) {
      message.style.color = "red";
      message.innerHTML = `You Lose. The word was "${secretWord}"`;
      done = true;
    }
    let letterDict = {};
    for (let pos = 0; pos < ANSWER_LENGTH; pos++) {
      const letter = typedWord[pos];
      const guessLetter = secretWord[pos];

      if (letterDict[guessLetter]) {
        letterDict[guessLetter]++;
        //console.log(letterDict);
      } else {
        letterDict[guessLetter] = 1;
        //console.log(letterDict);
      }
      if (letter === guessLetter) {
        letterFeedback(pos + 1, "#00a648");
        letterDict[letter]--;
      } else {
        letterFeedback(pos + 1, "#888888");
      }
    }
    for (let pos = 0; pos < ANSWER_LENGTH; pos++) {
      const letter = typedWord[pos];
      const guessLetter = secretWord[pos];
      if (secretWord.includes(letter) && letterDict[letter]>0 && letter!==guessLetter) {
          letterFeedback(pos + 1, "#f7c652");
          letterDict[letter]--;
      }
    }
    //console.log(letterDict);
    goNext();
    my_word = "";
  }
  sticky = false;
}

function changeBorder(validation) {
  if (validation === false) {
    my_word = "";
    for (let i = 1; i < 6; i++) {
      updateLetter(i);
      letter_pos.style.borderColor = "red";
    }
    setTimeout(() => {
      for (let i = 5; i >= 1; i--) {
        updateLetter(i);
        letter_pos.style.borderColor = "lightgrey";
        letter_pos.style.color = "white";
      }
    }, 1000);
    letter_index = 1;
    updateLetter(letter_index);
  }
  loadSpinner(false);
}
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}
function updateBoth(rowIndex, letterIndex) {
  row_pos = document.querySelector(
    `.puzzle-container .puzzle-row:nth-child(${rowIndex})`
  );
  letter_pos = row_pos.querySelector(`.puzzle-row :nth-child(${letterIndex})`);
}
function updateRow(rowIndex) {
  row_pos = document.querySelector(
    `.puzzle-container .puzzle-row:nth-child(${rowIndex})`
  );
}
function updateLetter(letterIndex) {
  letter_pos = row_pos.querySelector(`.puzzle-row :nth-child(${letterIndex})`);
}
function goNext() {
  row_index += 1;
  letter_index = 1;
  updateBoth(row_index, letter_index);
}
function letterFeedback(pos, color) {
  updateLetter(pos);
  letter_pos.style.backgroundColor = `${color}`;
  loadSpinner(false);
}