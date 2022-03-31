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

    updateSuggestion() {
        var curDict = this.#model.peekDictStack();
        if (curDict.length == 0) {
            this.#model.currentSuggestion = "";
        }
        if (this.#dictIndex == curDict.length - 1) {
            this.#dictIndex = 0;
        }
        this.#model.currentSuggestion = curDict[this.#dictIndex];
        this.#dictIndex++;
    }
}