import { fromEvent, Subject } from "rxjs";

const WORDS_LIST = require("./wordsList.json");

const letterRows = Array.from(document.querySelectorAll(".letter-row"));
const messageText = document.querySelector("#message-text");

const onKeyUp$ = fromEvent<KeyboardEvent>(document, "keyup");
let letterIndex = 0;
let letterRow = 0;
let userAnswer: string[] = [];

const getRandomWord = () => WORDS_LIST[Math.floor(Math.random() * WORDS_LIST.length)];
const rightWord = getRandomWord();
console.log(rightWord);

const userWinOrLose = new Subject<void>();

const insertLetter = {
  next: (event: KeyboardEvent) => {
    const pressedKey = event.key.toUpperCase();

    if (pressedKey.length === 1 && pressedKey.match(/[a-z]/i)) { // use regex to check if the key is a letter -> i flag is for case insensitive (a or A)
      userAnswer.push(pressedKey);

      const letterBox = letterRows[letterRow].children[letterIndex];
      letterBox.textContent = pressedKey;
      letterBox.classList.add("filled-letter");

      letterIndex++;
    }
  }
}

const removeLetter = {
  next: (event: KeyboardEvent) => {
    const pressedKey = event.key;

    if (pressedKey === "Backspace" && letterIndex > 0) {
      letterIndex--;

      const letterBox = letterRows[letterRow].children[letterIndex];
      letterBox.textContent = "";
      letterBox.classList.remove("filled-letter");

      userAnswer.pop();
    }
  }
}

const checkWord = {
  next: (event: KeyboardEvent) => {
    if (event.key !== "Enter") return;

    if (userAnswer.length < rightWord.length && messageText) {
      messageText.textContent = 'Keep going!';
      return;
    }

    if (letterRow > 5) {
      if (messageText) messageText.textContent = 'You lose!';
      return;
    }

    for (let i = 0; i < 5; i++) {
      let letterColor = '';
      let letterBox = letterRows[letterRow].children[i];

      let letterPosition = rightWord.indexOf(userAnswer[i]);

      if (letterPosition === -1) {
        letterColor = 'letter-grey';
      }

      if (letterPosition !== -1 && letterPosition !== i) {
        letterColor = 'letter-yellow';
      }

      if (letterPosition === i) {
        letterColor = 'letter-green';
      }

      letterBox.classList.add(letterColor);
    }

    if (userAnswer.join("") === rightWord) {
      // en los subject no es necesario pasarle un valor a next, simplemente con emitir una señal es suficiente
      userWinOrLose.next();
    }
    
    letterRow++;
    letterIndex = 0;
    userAnswer = [];
  }
}

onKeyUp$.subscribe(insertLetter);
onKeyUp$.subscribe(removeLetter);
onKeyUp$.subscribe(checkWord);
userWinOrLose.subscribe(() => {
  let letters = [...letterRows[letterRow].children]
  letters.forEach(element => element.classList.add('letter-green'));
})
