export { Card };

import { modalImage, addWindowEventListener } from "./index.js";

class Card {
  constructor(heading, imgLink, selector) {
    this._heading = heading;
    this._imgLink = imgLink;
    this._selector = selector;
  }
  _getTemplate() {
    const card = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);
    return card;
  }

  _handleFullRes() {
    const image = modalImage.querySelector(".popup__image");
    const caption = modalImage.querySelector(".popup__capture");

    image.src = this._imgLink;
    image.alt = this._heading;
    caption.textContent = this._heading;
    modalImage.classList.toggle("popup_opened");
    addWindowEventListener();
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle("card__button_type_liked");
  }

  _handleDeleteButton(evt) {
    evt.target.closest(".card").remove();
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handleFullRes());
    this._element
      .querySelector(".card__button")
      .addEventListener("click", (evt) => this._handleLikeButton(evt));
    this._element
      .querySelector(".card__button-trash")
      .addEventListener("click", (evt) => this._handleDeleteButton(evt));
  }

  generateCard() {
    this._element = this._getTemplate();

    const image = this._element.querySelector(".card__image");
    const heading = this._element.querySelector(".card__heading");

    image.src = this._imgLink;
    image.alt = `На фото: ${this._heading}`;
    heading.textContent = this._heading;

    this._setEventListeners();

    return this._element;
  }
}
