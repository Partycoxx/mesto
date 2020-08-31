import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, imageLink, imageHeading) {
        super(popupSelector);
        this._imageLink = imageLink;
        this._imageHeading = imageHeading;
    }

    open() {
        super.open();

        const image = this._popup.querySelector(".popup__image");
        const caption = this._popup.querySelector(".popup__capture");

        image.src = this._imageLink;
        image.alt = this._imageHeading;
        caption.textContent = this._imageHeading;
}
}