import WordleGame from "./classes/WordleGame.js";
const Keyboard = window.SimpleKeyboard.default;


let wg = new WordleGame('#wordle');
console.log("SCARE");

document.addEventListener('keydown', event => {
    let key = event.key;
    if (isLetter(key.toUpperCase())) {
        wg.guessLetter(key.toUpperCase());
    }

    if (event.code == 'Enter') {
        wg.tryGuess();
    }

    if (event.code == 'Backspace') {
        wg.deleteGuessLetter();
    }
});


function isLetter(str) {
    return str.length === 1 && str.match(/[A-Z]/i);
}

const myKeyboard = new Keyboard({
    onKeyPress: button => onKeyPress(button),
    layout: {
        'default': [
          'q w e r t y u i o p {bksp}',
          'a s d f g h j k l',
          'z x c v b n m {enter}',
        ]
    },
    theme: 'white-bg hg-theme-default'
});

function onKeyPress(button) {
    let key = button.toUpperCase();

    if (isLetter(key)) {
        wg.guessLetter(key);
    }

    if (key == '{ENTER}') {
        wg.tryGuess();
    }

    if (key == '{BKSP}') {
        wg.deleteGuessLetter();
    }
}
