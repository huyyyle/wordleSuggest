class wordleSuggestController {
    #model;

    constructor(wordleSuggestModel) {
        this.#model = wordleSuggestModel;
    }
    
    /**
     * Update the dictionary stack in the model
     * to reflect the possible words given
     * what the user has given so far.
     * @param {*} guess is the String of the ongoing guess.
     */
    makeGuess(guess) {
        if (guess.length == this.#model.getPreviousGuess().lenght + 1) {
            this.#model.addGuess(guess.charAt(guess.length -1));
            this.#model.setPreviousGuess = guess;
        }
        else if (guess.length == this.#model.getPreviousGuess().lenght - 1) {
            this.#model.delGuess();
            this.#model.setPreviousGuess = guess;
        }
        else {
            this.#model.clearGuess();
            for (let index = 0; index < guess.length; index++) {
                const letter = guess[index];
                this.#model.addGuess(letter);
            }
            this.#model.setPreviousGuess = guess;
        }
    }

    
}