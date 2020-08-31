export default class Section {
    constructor({ items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this.containerSelector = containerSelector;
    }

    renderItems() {
        this._items.forEach(item => {
            this._renderer(item);
        })
    }

    addItem(element) {
        this.containerSelector.append(element);
    }

    addItemPrepend(element) {
        this.containerSelector.prepend(element);
    }
}