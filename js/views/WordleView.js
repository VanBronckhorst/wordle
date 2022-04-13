import GuessResult from "../classes/GuessResult.js";

const PARENT_EL = Symbol();
const CELLS = Symbol();
const ROWS = Symbol();

export default class WordleView {
    constructor(parentSelector) {
        this[PARENT_EL] =  document.querySelector(parentSelector);
        this[CELLS] = {};
        this[ROWS] = {};
        this.buildGrid();
    }

    buildGrid() {
        let grid = document.createElement("div");
        grid.classList.add("pll-wordle-grid");
        
        for (var i = 0; i < 6; i++) {
            grid.appendChild(this.buildRow(i));
        }

        this.parent.appendChild(grid);
    }

    buildRow(index) {
        let row = document.createElement("div");
        row.classList.add("pll-wordle-row");
        
        for (var i = 0; i < 5; i++) {
            row.appendChild(this.buildCell(index, i));
        }
        this[ROWS][index] = row;

        return row;
    }

    buildCell(r, c) {
        let cell = document.createElement("div");

        cell.classList.add("pll-wordle-cell");
        this[CELLS][r + "-" + c] = cell;

        return cell;
    }

    updateState(state) {
        for (let r = 0; r < state.length; r++) {
            for (let c = 0; c < state[r].length; c++) {
                let cell = this[CELLS][r + "-" + c];
                this._updateCell(cell, state[r][c]);
            }
        }
    }

    badGuess(index) {
        let row = this[ROWS][index];
        row.classList.add('pll-shake');
        window.setTimeout(() => {
            row.classList.remove('pll-shake');
        }, 2000);

    }

    _updateCell(cell, state) {
        while (cell.firstChild) {
            cell.removeChild(cell.firstChild);
        }
        let span = document.createElement("span");
        span.classList.add("pll-wordle-cell-text");


        if (state.state == GuessResult.Match) {
            cell.classList.add("pll-wordle-cell-match");
        } else if (state.state == GuessResult.NoMatch) {
            cell.classList.add("pll-wordle-cell-no-match");
        } else if (state.state == GuessResult.WrongPlace) {
            cell.classList.add("pll-wordle-cell-wrong-place");
        }

        span.textContent = state.letter;
        cell.appendChild(span);
    }

    get parent() {
        return this[PARENT_EL];
    }
}