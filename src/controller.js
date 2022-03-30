class wordleSuggestController {
    #model;
    #dictIndex;

    constructor(wordleSuggestModel) {
        this.#model = wordleSuggestModel;
        this.#dictIndex = 0;
    }
    
    makeGuess(guess) {
        this.#model.clearGuess();
        this.#dictIndex = 0;
        for (let index = 0; index < guess.length; index++) {
            const letter = guess[index];
            this.#model.addGuess(letter);
        }
    }

    getSuggestion() {
        var curDict = this.#model.peekDictStack();
        if (curDict.length == 0) {
            throw 'No Suggestions availiable';
        }
        if (this.#dictIndex == curDict.length - 1) {
            this.#dictIndex = 0;
        }
        var retval = curDict[this.#dictIndex];
        this.#dictIndex++;
        return retval;
    }
}