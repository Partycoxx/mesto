export { FormValidator };

class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(settings.submitButtonSelector);
    this._formInputs = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
  }

  _showErrorMessage() {
    const errorElement = this._inputElement.closest(this._settings.formSelector).querySelector(`#${this._inputElement.id}-error`);

    this._inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = this._inputElement.validationMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideErrorMessage() {
    const errorElement = this._inputElement.closest(this._settings.formSelector).querySelector(`#${this._inputElement.id}-error`);

    this._inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._settings.errorClass);
  }

  _isValid(inputElement) {
    this._inputElement = inputElement;

    if (!this._inputElement.validity.valid) {
      this._showErrorMessage();
    } else {
      this._hideErrorMessage();
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "true");
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled", "false");
    }
  }

  _hasInvalidInput() {
    return this._formInputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setEventListeners() {
    this._formInputs.map((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._isValid(evt.target);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._toggleButtonState();
    this._setEventListeners();
  }
}
