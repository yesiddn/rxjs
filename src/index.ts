import { fromEvent, Subject } from "rxjs";

const WORDS_LIST = require("./wordsList.json");

const letterRows = Array.from(document.querySelectorAll(".letter-row"));

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

    if (pressedKey === "Backspace") {
      letterIndex--;

      const letterBox = letterRows[letterRow].children[letterIndex];
      letterBox.textContent = "";
      letterBox.classList.remove("filled-letter");
    }
  }
}

const checkWord = {
  next: (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      if (userAnswer.join("") === rightWord) {
        // en los subject no es necesario pasarle un valor a next, simplemente con emitir una señal es suficiente
        userWinOrLose.next();
      }
    }
  }
}

onKeyUp$.subscribe(insertLetter);
onKeyUp$.subscribe(removeLetter);
onKeyUp$.subscribe(checkWord);
userWinOrLose.subscribe(() => {
  let letters = [...letterRows[letterRow].children]
  letters.forEach(element => element.classList.add('letter-green'));
})
