class wordleSuggestView {
    #model;
    #controller;
    #injectionSite;
    #currentRow;
    #currentGuess;

    constructor(model, controller) {
        this.#model = model;
        this.#controller = controller;
        this.#injectionSite = this.getInjectionSite();
        this.#currentGuess = '';

        //Init CSS
        this.addCSS();
    }

    /**
     * Create the initial view, and initialize basic
     * variables. Initializes input handling.
     */
    initializeView() {
        this.updateRow();
        this.updateCurGuess();
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
            else if (event.key == 'Tab') {
                this.updateView();
            }
            else {
                this.updateCurGuess();
                this.#controller.makeGuess(this.#currentGuess);
                console.log(this.#currentGuess);
                console.log(this.#model.currentSuggestion);
                this.updateView();
            }

        })

    }

    /**
     * Updates the suggestion shown on screen.
     * @returns null;
     */
    updateView() {
        this.displaySuggestion();

    }

    /**
     * Show an autocomplete on screen for the first
     * word possible from the current guess.
     * @returns 
     */
    displaySuggestion() {
        this.clearSuggestion();
        this.#controller.updateSuggestion();
        if (this.#model.currentSuggestion.length == 0) {
            return;
        }
        var tiles = this.#currentRow.querySelector('.row').querySelectorAll('game-tile');
        var suggestion = this.#model.currentSuggestion;
        for (var i = 5 - suggestion.length; i < 5; i++) {
            this.addSuggestion(tiles[i], suggestion.charAt(i - this.#model.getDictStack().length))
        }
    }

    /**
     * Clears the suggestion bar.
     */
     clearSuggestion() {
        var tiles = this.#currentRow.querySelector('.row').querySelectorAll('game-tile');
        for (var i = this.#model.getDictStack().length; i < 5; i++) {
            this.removeSuggestion(tiles[i]);
        }
    }

    /**
     * Targets and returns the element containing the game.
     * @returns the element containing the Wordle Board.
     */
    getInjectionSite() {
        var x = document.querySelector("game-app");
        x = x.shadowRoot;
        x = x.querySelector("game-theme-manager");
        x = x.querySelector("#game");
        x = x.querySelector('#board-container');
        x = x.querySelector('#board');
        x = x.querySelectorAll('game-row');
        return x;
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
     * Convert a given tile back to the empty state.
     * @param {*} tile element containing the tile.
     */
    removeSuggestion(tile) {
        tile.shadowRoot.querySelector('div').setAttribute('data-state', 'empty');
    }

    /**
     * Adds the custom CSS for a suggestive Wordle tile, to
     * every tile.
     */
    addCSS() {
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
     * Get the ongoing user guess.
     * @returns the String of the current user guess.
     */
    updateCurGuess() {
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
        this.#currentGuess = guess;
    }

    
}