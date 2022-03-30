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
        //temp
        this.CSSSet = false;
    }

    initializeView() {
        setTimeout(this.temp(), 1000);
        console.log("WORKS");
        setTimeout(this.temp(), 5000);
        console.log("WORKS");
        setTimeout(this.temp(), 10000);

    }

    temp() {
        this.#currentRow = this.getCurRow();
        this.#currentGuess = this.getCurGuess();
        /* TEST */
        this.#currentGuess = "aa";
        /* */
        if (this.CSSSet == false) {
            this.addCSS();
            this.CSSSet = true;
        }

        console.log(this.#currentGuess);
        if (this.#currentGuess.length == 0) {
            return;
        }
        this.displaySuggestion();
    }

    displaySuggestion() {
        var tiles = this.#currentRow.querySelector('.row').querySelectorAll('game-tile');
        this.#controller.makeGuess(this.#currentGuess);
        var curDict = model.peekDictStack;
        if (curDict.length == 0) {
            return;
        }
        //TODO: ADD A WAY TO GO TO NEXT IN DICT
        var suggestion = curDict[0];
        for (var i = this.model.getdictStack.length; i < 5; i++) {
            addSuggestion(tiles[i], curDict[0].charAt(i - dictStack.length))
        }
    }

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

    getCurRow() {
        var curRow;
        console.log(this.#injectionSite);
        for (const element of this.#injectionSite) {
            var firstTile = element.shadowRoot;
            var firstTile = firstTile.querySelector('game-tile');
            if (!firstTile.hasAttribute('evaluation')) {
                var curRow = element.shadowRoot;
                return curRow;
            }
        }
    }

    addSuggestion(tile, letter) {
        var innerTile = tile.shadowRoot.querySelector('div');
        innerTile.innerHTML = letter;
        innerTile.setAttribute('data-state', 'suggest');
    }

    addCSS() {
        //TODO: MAKE IT GLOBAL
        var tiles = this.#currentRow.querySelector('.row').querySelectorAll('game-tile');
        for (var i = 0; i < 5; i++) {
            var style = tiles[i].shadowRoot.querySelector('style');
            style.innerHTML += 
            ".tile[data-state = 'suggest'] {"
                + "border: 2px solid var(--color-tone-4);"
                + "color: gray;}";
        }
    }

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