import { filter, fromEvent, map, merge, Subject, takeUntil } from "rxjs";

const WORDS_LIST = require("./wordsList.json");

const restartButton = document.querySelector('.restart-button') as HTMLButtonElement | null;
const letterRows = Array.from(document.querySelectorAll(".letter-row"));
const messageText = document.querySelector("#message-text");

const onKeyUp$ = fromEvent<KeyboardEvent>(document, "keyup");
let letterIndex: number;
let letterRow: number;
let userAnswer: string[] = [];

const getRandomWord = () => WORDS_LIST[Math.floor(Math.random() * WORDS_LIST.length)];
let rightWord: string;

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
  filter((key) => key === 'Enter' && letterRow <= 6)
);

const checkWord = {
  next: () => {
    if (userAnswer.length < rightWord.length && messageText) {
      // decir qrue falta una letra
      messageText.textContent = userAnswer.length === 4 ? '1 letter is missing' : `${5 - userAnswer.length} letters are missing`;
      return;
    }

    if (!WORDS_LIST.includes(userAnswer.join('')) && messageText) {
      messageText.textContent = 'This word does not exist';
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

// userWinOrLose$.subscribe(() => {
//   let letters = [...letterRows[letterRow].children]
//   letters.forEach(element => element.classList.add('letter-green'));
// })

const onWindowLoad$ = fromEvent(window, 'load');
const onRestartClick$ = fromEvent(restartButton || document, 'click');

const restartGame$ = merge(onWindowLoad$, onRestartClick$);

restartGame$.subscribe(() => {
  // se limpian los campos
  letterRows.forEach((row) => {
    let letters = [...row.children];
    letters.forEach((element) => {
      element.textContent = '';
      element.classList.add('letter');
      element.classList.remove('filled-letter', 'letter-green', 'letter-yellow', 'letter-grey');
    });
  });

  letterIndex = 0;
  letterRow = 0;
  userAnswer = [];
  if (messageText) messageText.textContent = '';
  rightWord = getRandomWord();

  console.log(rightWord);

  if (restartButton) restartButton.disabled = true;

  let insertLetterSubscription = insertLetter$.pipe(takeUntil(userWinOrLose$)).subscribe(insertLetter);
  let checkWordSubscription = checkWord$.pipe(takeUntil(userWinOrLose$)).subscribe(checkWord);
  let removeLetterSubscription = removeLetter$.pipe(takeUntil(userWinOrLose$)).subscribe(removeLetter);
});
// onKeyUp$.subscribe(insertLetter);
// onKeyUp$.subscribe(removeLetter);
// onKeyUp$.subscribe(checkWord);
