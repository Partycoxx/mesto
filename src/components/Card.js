export default class Card {
  constructor({ handleCardClick, handleDeleteClick }, data, selector, ownerId) {

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._selector = selector;
    this._ownerId = ownerId;
    this._newHeading = data.name;
    this._newImageLink = data.link;
    this._cardId = data._id;
    this._likes = data.likes.length;
    this._cardOwnerId = data.owner._id;
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

  _checkOwnership() {
    if (this._cardOwnerId === this._ownerId) {
      this._trashButton.addEventListener("click", () => {
      this._handleDeleteClick(this._cardId, this._element)
      }
    );
      this._setEventListeners();
    } else {
      this._trashButton.setAttribute('style', 'display: none');
      this._setEventListeners();
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._newHeading, this._newImageLink)
    );
    this._likeButton.addEventListener("click", () => this._handleLikeButton());
  }

  _setLikes(numberOfLikes) {
    this._likeCounter.textContent = numberOfLikes;
  }
  //↑ Вероятно, стоит сделать публичным

  _setCardProperties() {

    this._likeCounter = this._element.querySelector(".card__like-counter");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._trashButton = this._element.querySelector(".card__button-trash");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardHeading = this._element.querySelector(".card__heading");
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setCardProperties();

    this._cardImage.src = this._newImageLink;
    this._cardImage.alt = `На фото: ${this._newHeading}`;
    this._cardHeading.textContent = this._newHeading;

    this._checkOwnership();
    this._setLikes(this._likes);

    return this._element;
  }
}
