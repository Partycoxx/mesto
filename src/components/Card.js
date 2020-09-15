export default class Card {
  constructor({ handleCardClick, handleDeleteClick, handleLikeCard, handleDislikeCard }, 
    {newHeading, newImageLink, cardId, likes, numberOfLikes, cardOwnerId}, selector, ownerId) {

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeCard = handleLikeCard;
    this._handleDislikeCard = handleDislikeCard;
    this._newHeading = newHeading;
    this._newImageLink = newImageLink;
    this._cardId = cardId;
    this._likes = likes;
    this._numberOfLikes = numberOfLikes;
    this._cardOwnerId = cardOwnerId;
    this._selector = selector;
    this._ownerId = ownerId;
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

    if (this._likeButton.classList.contains("card__like-button_type_liked")) {
      this._handleLikeCard(this._cardId);
    } else {
      this._handleDislikeCard(this._cardId) 
    }

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

  _checkLikesList() {

    if (this._likes.some(elem => elem._id === this._ownerId)) {
      this._likeButton.classList.toggle("card__like-button_type_liked");
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._newHeading, this._newImageLink)
    );
    this._likeButton.addEventListener("click", () => this._handleLikeButton()); // Передать коллбэк с функцией постановки лайка лайком сюда
  }

  setLikes(numberOfLikes) {
    this._likeCounter.textContent = numberOfLikes;
  }

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
    this._checkLikesList();
    this.setLikes(this._numberOfLikes); /// перенести в Index

    return this._element;
  }
}
