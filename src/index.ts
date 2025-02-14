import { filter, fromEvent, map, Subject, takeUntil } from "rxjs";

const WORDS_LIST = require("./wordsList.json");

const restartButton = document.querySelector('.restart-button') as HTMLButtonElement | null;
const letterRows = Array.from(document.querySelectorAll(".letter-row"));
const messageText = document.querySelector("#message-text");

const onKeyUp$ = fromEvent<KeyboardEvent>(document, "keyup");
let letterIndex = 0;
let letterRow = 0;
let userAnswer: string[] = [];

const getRandomWord = () => WORDS_LIST[Math.floor(Math.random() * WORDS_LIST.length)];
const rightWord = getRandomWord();
console.log(rightWord);

const userWinOrLose$ = new Subject<void>();

const insertLetter$ = onKeyUp$.pipe(
  map((event) => event.key.toUpperCase()),
  filter(
    (pressedKey) =>
      pressedKey.length === 1 &&
      letterIndex < 5 &&
      /[a-z]/i.test(pressedKey) // se cambia a esta forma de regex ya que pressedKey.match(/[a-z]/i) puede retornar un null o un error
  )
);

const insertLetter = {
  next: (pressedKey: string) => {
    userAnswer.push(pressedKey);

    const letterBox = letterRows[letterRow].children[letterIndex];
    letterBox.textContent = pressedKey;
    letterBox.classList.add("filled-letter");

    letterIndex++;
  }
}

const removeLetter$ = onKeyUp$.pipe(
  map((event => event.key)),
  filter(key => key === 'Backspace' && letterIndex > 0)
)

const removeLetter = {
  next: () => {
    letterIndex--;

    const letterBox = letterRows[letterRow].children[letterIndex];
    letterBox.textContent = "";
    letterBox.classList.remove("filled-letter");

    userAnswer.pop();
  }
}

const checkWord$ = onKeyUp$.pipe(
  map((event) => event.key),
  filter((key) => key === 'Enter' && letterIndex === 5 && letterRow <= 5)
);

const checkWord = {
  next: () => {
    if (userAnswer.length < rightWord.length && messageText) {
      messageText.textContent = 'Keep going!';
      return;
    }

    // tambien se puede usar userAnswer.map
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

    if (userAnswer.join("") === rightWord && messageText && restartButton) {
      // en los subject no es necesario pasarle un valor a next, simplemente con emitir una señal es suficiente
      messageText.textContent = `✨ You win! ${rightWord.toUpperCase()} is the right word`;
      userWinOrLose$.next();
      restartButton.disabled = false;
    } else {
      letterRow++;
      letterIndex = 0;
      userAnswer = [];

      if (letterRow === 6 && messageText && restartButton) {
        messageText.textContent = `😣 You lose! ${rightWord.toUpperCase()} is the right word`;
        userWinOrLose$.next();
        restartButton.disabled = false;
      }
    }

  }
}

userWinOrLose$.subscribe(() => {
  let letters = [...letterRows[letterRow].children]
  letters.forEach(element => element.classList.add('letter-green'));
})

// onKeyUp$.subscribe(insertLetter);
// onKeyUp$.subscribe(removeLetter);
// onKeyUp$.subscribe(checkWord);
insertLetter$.pipe(takeUntil(userWinOrLose$)).subscribe(insertLetter);
checkWord$.pipe(takeUntil(userWinOrLose$)).subscribe(checkWord);
removeLetter$.pipe(takeUntil(userWinOrLose$)).subscribe(removeLetter);
