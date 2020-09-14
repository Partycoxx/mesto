import Popup from "./Popup.js";

export default class PopupWithApprove extends Popup {
constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
}

setData(id, element) {
    this._id = id;
    this._element = element;
}

setEventListener() {
    super.setEventListener();

    this._popup.addEventListener('submit', (evt) => {
        evt.preventDefault();

        this._handleSubmit(this._id, this._element);
    })
}
} 