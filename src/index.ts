import { fromEvent } from "rxjs";

const letterRows = Array.from(document.querySelectorAll(".letter-row"));

const onKeyUp$ = fromEvent<KeyboardEvent>(document, "keyup");
let letterIndex = 0;
let letterRow = 0;

const insertLetter = {
  next: (event: KeyboardEvent) => {
    const pressedKey = event.key.toUpperCase();

    if (pressedKey.length === 1 && pressedKey.match(/[a-z]/i)) { // use regex to check if the key is a letter -> i flag is for case insensitive (a or A)
      const letterBox = letterRows[letterRow].children[letterIndex];
      letterBox.textContent = pressedKey;
      letterBox.classList.add("filled-letter");

      letterIndex++;
    }
  }
}

onKeyUp$.subscribe(insertLetter);
