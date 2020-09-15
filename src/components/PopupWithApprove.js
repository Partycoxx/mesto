import Popup from "./Popup.js";

export default class PopupWithApprove extends Popup {
constructor(popupSelector) {
    super(popupSelector);
}

setData(id, element, handleSubmit) {
    this._id = id;
    this._element = element;
    this._handleSubmit = handleSubmit;
}

setEventListener() {
    super.setEventListener();

    this._popup.addEventListener('submit', (evt) => {
        evt.preventDefault();

        this._handleSubmit(this._id, this._element);
    })
}
} 