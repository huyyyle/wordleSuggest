function main() {
    model = new wordleSuggestModel();
    controller = new wordleSuggestController(model);
    view = new wordleSuggestView(model, controller);
    view.initializeView();

}
document.addEventListener('DOMContentLoaded', (event) => {main()});


