import GuessResult from "./GuessResult.js";
import WordleView from "../views/WordleView.js";
import WordMatcher from "./WordMatcher.js";
import Results from "./Results.js";

const VIEW = Symbol();
const GUESSES = Symbol();
const GUESS_INDEX = Symbol();
const GUESS_LETTER_INDEX = Symbol();
const WORD_MATCHER = Symbol();
const GAMEOVER = Symbol();


export default class WordleGame {
    constructor(selector) {
        let view = new WordleView(selector);
        this[VIEW] = view;
        this[GUESS_INDEX] = 0;
        this[GUESS_LETTER_INDEX] = 0;
        this[WORD_MATCHER] = new WordMatcher();
        this[GAMEOVER] = false;
        this.results = new Results();
        this._buildInitialState();
    }

    guessLetter(letter) {
        if (this[GUESS_LETTER_INDEX] >= 5 || this[GAMEOVER]) {
            return;
        }

        this[GUESSES][this[GUESS_INDEX]][this[GUESS_LETTER_INDEX]].letter = letter;
        this[GUESS_LETTER_INDEX] += 1;
        
        this._updateView();
    }

    deleteGuessLetter() {
        if (this[GUESS_LETTER_INDEX] == 0 || this[GAMEOVER]) {
            return;
        }

        this[GUESS_LETTER_INDEX] -= 1;
        this[GUESSES][this[GUESS_INDEX]][this[GUESS_LETTER_INDEX]].letter = "";
        
        
        this._updateView();
    }

    tryGuess() {
        if (this[GUESS_LETTER_INDEX] != 5 || this[GAMEOVER]) {
            return;
        }

        let guess = this._getCurrentGuess();

        if (this[WORD_MATCHER].isValidWord(guess)) {
            this._guessValidWord(guess);
        } else {
            this[VIEW].badGuess(this[GUESS_INDEX]);
        }
    }

    _guessValidWord(guess) {
        let result = this[WORD_MATCHER].match(guess);
        for (let i = 0; i < this[GUESSES][this[GUESS_INDEX]].length; i++) {
            this[GUESSES][this[GUESS_INDEX]][i].state = result[i];
        } 
        this._processGuessResult(result);
    }

    _processGuessResult(result) {
        this[GUESS_INDEX] += 1;
        this[GUESS_LETTER_INDEX] = 0;
        this._updateView();

        if (this._isWinning(result)) {
            this._endgame(true);
        }

        if (this[GUESS_INDEX] >= 6) {
            this._endgame(false);
        }
    }

    _endgame(won) {
        this[GAMEOVER] = true;
        this.results.storeResult(won, this[GUESS_INDEX] - 1);
        let text = won ? "You Won!" : "You Lost!";
        text += "\n";

        text += this._stateToString();

        text += this.results.getSummary();

        window.alert(text);
    }

    _stateToString() {
        let res = "";

        for (let i = 0; i < this[GUESS_INDEX]; i++) {
            let row = "";
            for (let j = 0; j < this[GUESSES][i].length; j++) {

                switch (this[GUESSES][i][j].state) {
                    case GuessResult.Match:
                        row += "\u{1F7E9}";
                        break;
                    case GuessResult.NoMatch:
                        row += "⬛️" 
                        break;
                    case GuessResult.WrongPlace:
                        row += "🟨"
                        break;
                }
            }
            row += "\n";
            res += row;
        }
        return res;
    }

    _isWinning(result) {
        return result.every(m => m == GuessResult.Match);
    }

    _buildInitialState() {
        this[GUESSES] = [];
        for (var i = 0; i < 6; i++) {
            let r = [];
            for (var j = 0; j < 5; j++) {
                r.push({"state": GuessResult.Pending, "letter": ""});
            }
            this[GUESSES].push(r);
        }
    }

    _updateView() {
        this[VIEW].updateState(this[GUESSES]);
    }

    _getCurrentGuess() {
        
        let guess = ""; 
        for (let i = 0; i < this[GUESSES][this[GUESS_INDEX]].length; i++) {
            guess += this[GUESSES][this[GUESS_INDEX]][i].letter;
        }
        return guess;
    }
}