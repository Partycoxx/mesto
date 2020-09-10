export default class Card {
  constructor({ handleCardClick, heading, imgLink }, selector) {
    this._heading = heading;
    this._imgLink = imgLink;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);
    return card;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_type_liked");
  }

  _handleDeleteButton(evt) {
    this._trashButton.closest(".card").remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._trashButton = this._element.querySelector(".card__button-trash");
    this._cardImage = this._element.querySelector(".card__image");

    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._heading, this._imgLink)
    );
    this._likeButton.addEventListener("click", () => this._handleLikeButton());
    this._trashButton.addEventListener("click", () =>
      this._handleDeleteButton()
    );
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
