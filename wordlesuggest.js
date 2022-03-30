//import wordleSuggestController from './scr/controller'
//import wordleSuggestModel from './scr/model'
//import wordleSuggestView from './scr/view'

function main() {
    model = new wordleSuggestModel();
    controller = new wordleSuggestController(model);
    view = new wordleSuggestView(model, controller);
    console.log("WORKING3");
    view.initializeView();
}

document.addEventListener('DOMContentLoaded', (event) => {main()});


