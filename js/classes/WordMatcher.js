import GuessResult from "./GuessResult.js";
import WordsList from "./WordsList.js";

const SECRET = Symbol();

export default class WordMatcher {

    constructor(secret) {
        if (secret === undefined) {
            secret = WordsList[Math.floor(Math.random() * WordsList.length)];
        }
        console.log(secret);
        this[SECRET] = secret;
        
    }

    match(guess) {
        guess = guess.toLowerCase();
        let res = [];
        let missingMatches = {};
        for (var i = 0; i < this.secret.length; i++) {
            if (guess[i] == this.secret[i]) {
                res.push(GuessResult.Match);
            } else {
                res.push(GuessResult.NoMatch);
                if (!missingMatches.hasOwnProperty(this.secret[i])) {
                    missingMatches[this.secret[i]] = 0;
                }
                missingMatches[this.secret[i]] += 1;
            }
        }

        for (var i = 0; i < res.length; i++) {
            if (res[i] !== GuessResult.Match && missingMatches.hasOwnProperty(guess[i]) && missingMatches[guess[i]] > 0) {
                res[i] = GuessResult.WrongPlace;
                missingMatches[guess[i]] -= 1;
            }
        }

        return res;
    }

    isValidWord(w) {
        console.log("Matching", w);
        w = w.toLowerCase();
        let l = 0; 
        let r = WordsList.length;

        while (l <= r) {
            let mid = l + Math.round((r - l) / 2);
            if (WordsList[mid] == w) {
                return true;
            }
            if (WordsList[mid] > w) {
                r = mid - 1;
            }
            if (WordsList[mid] < w) {
                l = mid + 1;
            }
        }

        return false;
    }

    get secret() {
        return this[SECRET];
    }
}