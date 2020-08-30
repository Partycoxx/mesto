export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._escListener = this._handleEscClose.bind(this);
    this._mousedownListener = this._mousedownListener.bind(this);

  }

  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListener();
    window.addEventListener("keydown", this._escListener);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._popup.removeEventListener("mousedown", this._mousedownListener)
    window.removeEventListener("keydown", this._escListener);
  }

  _handleEscClose(evt) {
    const openedPopup = document.querySelector(".popup_opened");
    if (evt.key === "Escape" && openedPopup != null) {
        this.close();
    }
  }

  _mousedownListener(evt) {
    if (
        evt.target.classList.contains("popup__close-button") ||
        evt.target.classList.contains("popup")
      ) {
        this.close();
      }
  }

  setEventListener() {
    this._popup.addEventListener("mousedown", this._mousedownListener)
  }
}
