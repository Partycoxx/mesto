import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._toggleSubmitListener = this._toggleSubmitListener.bind(this);
    this._button = this._popup.querySelector(".popup__button");
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__input");

    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }

  _toggleSubmitListener(evt) {
    evt.preventDefault();

    this._handleFormSubmit(this._getInputValues());

    this._form.reset();
  }

  setEventListener() {
    super.setEventListener();

    this._popup.addEventListener("submit", this._toggleSubmitListener);
  }

  close() {
    super.close();
    this._button.classList.add("popup__button_inactive");
    this._button.setAttribute("disabled", "true");

    this._popup.removeEventListener("submit", this._toggleSubmitListener);
    this._form.reset();
  }
}
