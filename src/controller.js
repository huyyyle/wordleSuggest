class wordleSuggestController {
    #model;

    constructor(wordleSuggestModel) {
        this.#model = wordleSuggestModel;
        this.#dictIndex = 0;
    }
    
    /**
     * Update the dictionary stack in the model
     * to reflect the possible words given
     * what the user has given so far.
     * @param {*} guess is the String of the ongoing guess.
     */
    makeGuess(guess) {
        this.#model.clearGuess();
        for (let index = 0; index < guess.length; index++) {
            const letter = guess[index];
            this.#model.addGuess(letter);
        }
    }
}