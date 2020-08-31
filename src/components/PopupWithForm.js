import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._button = this._popup.querySelector(".popup__button");
    this._inputList = this._popup.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }

  setInputValues(obj) {
    this._inputList[0].value = obj.name;
    this._inputList[1].value = obj.occupation;
  }

  setEventListener() {
    super.setEventListener();

    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());

      this._form.reset();
    });
  }

  close() {
    super.close();
    this._button.classList.add("popup__button_inactive");
    this._button.setAttribute("disabled", "true");
  }
}
