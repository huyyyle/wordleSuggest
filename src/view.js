/**
 * The view class is responsible for processing and displaying suggestions
 * stored in the Model, and updating suggestions via the controller.
 */
class wordleSuggestView {
    #model;
    #controller;

    #injectionSite;
    #currentRow;
    #currentGuess;

    #dictIndex;
    #currentSuggestion;

    constructor(model, controller) {
        this.#model = model;
        this.#controller = controller;

        this.#injectionSite = this.getInjectionSite();
        this.#currentGuess = "";
        this.#currentSuggestion = "";
        this.#dictIndex = 0;

        //Init CSS
        this.injectCSS();

        this.updateRow();
        this.keyboardEventHandling();
    }

    /**
     * Updates the model through the controller
     * everytime a key is pressed. Moves focus
     * to the row below when enter is pressed.
     */
    keyboardEventHandling() {
        document.addEventListener('keyup', (event) => {
            if (event.key == 'Enter') {
                this.updateRow();
            }
            /* Three cases where suggestions are updated. Seperated for clarity.*/
            else if (event.key == 'Tab') {
                this.updateSuggestion();
                this.displaySuggestion();
            }
            else if (event.key == 'Backspace') {
                this.updateSuggestion();
                this.displaySuggestion();
            }
            //any alphabetical key
            else if ((event.keyCode >= 65 && event.keyCode <= 90)){
                this.updateSuggestion();
                this.displaySuggestion();
            }
        })

    }

    /**
     * Updates the current suggestion. 
     * If the guess is still the same, cycle to the next suggestion.
     * If the guess is different, update the current suggestion
     * to the first one in the new possible list.
     */
    updateSuggestion() {
        if (this.getCurGuess() != this.#currentGuess) {
            this.updateCurGuess();
            this.#controller.makeGuess(this.#currentGuess);
            this.#dictIndex = 0;
        }
        var curDict = this.#model.peekDictStack();
        //skip if no suggestions are available
        if (curDict.length == 0) {
            this.#currentSuggestion = "";
            return;
        }
        if (this.#dictIndex == curDict.length) {
            this.#dictIndex = 0;
        }
        this.#currentSuggestion = curDict[this.#dictIndex];
        this.#dictIndex++;

    }

    /**
     * If suggestions are availiable,
     * update the tiles after what the user
     * has typed to show a suggestion.
     */
    displaySuggestion() {
        this.clearSuggestion();
        //if no suggestions are availiable, exit.
        if (this.#currentSuggestion.length == 0) {
            return;
        }
        var tiles = this.#currentRow.querySelector('.row').querySelectorAll('game-tile');
        var suggestion = this.#currentSuggestion;
        for (var i = 5 - suggestion.length; i < 5; i++) {
            this.addSuggestion(tiles[i], suggestion.charAt(i - this.#model.getLength()))
        }
    }

    /**
     * Clears the current suggestion from the
     * user view.
     */
    clearSuggestion() {
        var tiles = this.#currentRow.querySelector('.row').querySelectorAll('game-tile');
        for (var i = this.#model.getLength(); i < 5; i++) {
            this.removeSuggestion(tiles[i]);
        }
    }

    /**
     * Convert a given tile back to the empty state.
     * @param {*} tile element containing the tile.
     */
    removeSuggestion(tile) {
        tile.shadowRoot.querySelector('div').setAttribute('data-state', 'empty');
    }

    /**
     * Targets and returns the element containing the game.
     * @returns the element containing the Wordle Board.
     */
    getInjectionSite() {
        var site = document.querySelector("game-app").shadowRoot;
        site = site.querySelector("game-theme-manager").querySelector("#game");
        site = site.querySelector('#board-container').querySelector('#board');
        site = site.querySelectorAll('game-row');
        return site;
    }

    /**
     * Updates the current row selector.
     */
    updateRow() {
        this.#currentRow = this.getCurRow();
    }

    /**
     * Get the guess row the player is currently on.
     * @returns the element containg the ongoing guess.
     */
    getCurRow() {
        var curRow;
        for (const element of this.#injectionSite) {
            var firstTile = element.shadowRoot;
            var firstTile = firstTile.querySelector('game-tile');
            if (!firstTile.hasAttribute('evaluation')) {
                var curRow = element.shadowRoot;
                return curRow;
            }
        }
    }

    /**
     * Convert a given tile to a "suggestion" tile
     * with the given letter.
     * @param {*} tile element containing the tile.
     * @param {*} letter one lettered String.
     */
    addSuggestion(tile, letter) {
        var innerTile = tile.shadowRoot.querySelector('div');
        innerTile.innerHTML = letter;
        innerTile.setAttribute('data-state', 'suggest');
    }

    /**
     * Adds the custom CSS for a suggestive Wordle tile, to
     * every tile.
     */
    injectCSS() {
        for (const element of this.#injectionSite) {
            var tiles = element.shadowRoot.querySelector('.row').querySelectorAll('game-tile');
            for (var i = 0; i < 5; i++) {
                var style = tiles[i].shadowRoot.querySelector('style');
                style.innerHTML += 
                ".tile[data-state = 'suggest'] {"
                    + "border: 2px solid var(--color-tone-4);"
                    + "color: gray;}";
            }
        }
    }

    /**
     * Update the current guess field
     * with the current value.
     */
    updateCurGuess() {
        this.#currentGuess = this.getCurGuess();
    }

    /**
     * Get the ongoing user guess.
     * @returns the String of the current user guess.
     */
    getCurGuess() {
        var tiles = this.#currentRow.querySelector('.row').querySelectorAll('game-tile');
        var guess = '';
        for (let index = 0; index < tiles.length; index++) {
            const tile = tiles[index];
            if (tile.hasAttribute('letter')) {
                guess += tile.getAttribute('letter');
                continue;
            }
            break;
        }
        return guess;
    }

    
}