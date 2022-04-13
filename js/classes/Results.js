

export default class Results {
    constructor() {
        this.results = JSON.parse(window.localStorage.getItem("pll-wordle-results")) || { "gamesPlayed": 0, "wins": 0, "streak": 0, "stats": [] };
    }

    storeResult(win, tries) {
        this.results.gamesPlayed++;
        if (win) {
            this.results.wins++;
            this.results.streak++;
        } else {
            this.results.streak = 0;
        }
        this.results.stats.push({ win, tries });

        window.localStorage.setItem("pll-wordle-results", JSON.stringify(this.results));
    }


    getSummary() {
        let text = "";

        text += `Total Games: ${this.results.gamesPlayed}\n`;
        text += `Wins: ${this.results.wins}\n`;
        text += `Winning Pct: ${this.results.gamesPlayed === 0 ? 0 : this.results.wins / this.results.gamesPlayed}\n\n`;

        text += `Streak: ${this.results.streak}\n`;

        return text;
    }

}