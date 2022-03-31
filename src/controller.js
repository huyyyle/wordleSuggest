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
}