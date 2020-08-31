export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._toggleEscClose = this._toggleEscClose.bind(this);
    this._toggleMousedownListener = this._toggleMousedownListener.bind(this);

  }

  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListener();
    window.addEventListener("keydown", this._toggleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._popup.removeEventListener("mousedown", this._toggleMousedownListener)
    window.removeEventListener("keydown", this._toggleEscClose);
  }

  _toggleEscClose(evt) {
    const openedPopup = document.querySelector(".popup_opened");
    if (evt.key === "Escape" && openedPopup != null) {
        this.close();
    }
  }

  _toggleMousedownListener(evt) {
    if (
        evt.target.classList.contains("popup__close-button") ||
        evt.target.classList.contains("popup")
      ) {
        this.close();
      }
  }

  setEventListener() {
    this._popup.addEventListener("mousedown", this._toggleMousedownListener)
  }
}
