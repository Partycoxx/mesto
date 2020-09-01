export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._toggleEscClose = this._toggleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    window.addEventListener("keydown", this._toggleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    window.removeEventListener("keydown", this._toggleEscClose);
  }

  _toggleEscClose(evt) {
    const openedPopup = document.querySelector(".popup_opened");
    if (evt.key === "Escape" && openedPopup != null) {
        this.close();
    }
  }

  setEventListener() {
    this._popup.addEventListener("mousedown", (evt) => {
        if (
            evt.target.classList.contains("popup__close-button") ||
            evt.target.classList.contains("popup")
          ) {
            this.close();
          }
    })
  }
}