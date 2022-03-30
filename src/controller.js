class wordleSuggestController {
    #model;

    constructor(wordleSuggestModel) {
        this.#model = wordleSuggestModel;
    }
    
    makeGuess(guess) {
        this.#model.clearGuess();
        for (let index = 0; index < guess.length; index++) {
            const letter = guess[index];
            this.#model.addGuess(letter);
        }
    }
}