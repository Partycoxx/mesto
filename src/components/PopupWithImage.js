import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, imageSelector, captureSelector ) {
        super(popupSelector);

        this._image = this._popup.querySelector(imageSelector);
        this._caption = this._popup.querySelector(captureSelector);
    }

    open(imageHeading, imageLink) {
        super.open();

        this._image.src = imageLink;
        this._image.alt = imageHeading;
        this._caption.textContent = imageHeading;
}
}