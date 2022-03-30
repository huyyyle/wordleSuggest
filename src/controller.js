class wordleSuggestController {
    #model;
    
    constructor(wordleSuggestModel) {
        this.model = wordleSuggestModel;
    }
    
    makeGuess(guess) {
        this.model.clearStack;
        for (let index = 0; guess < guess.length; index++) {
            const letter = guess[index];
            this.model.addGuess(letter);
        }
    }
}