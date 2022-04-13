export default class GuessResult {
    static Match = new GuessResult('Match');
    static WrongPlace = new GuessResult('WrongPlace');
    static NoMatch = new GuessResult('NoMatch');
    static Pending = new GuessResult('Pending');
  
    constructor(name) {
      this.name = name;
    }
    toString() {
      return `GuessResult.${this.name}`;
    }
  }