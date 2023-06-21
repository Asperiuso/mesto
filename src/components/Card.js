export default class Card {
  constructor(data, cardSelector, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__del-button');
    this._cardTitle = this._element.querySelector('.card__title');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle('card__like-button_active');
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  _handleImageClick() {
    this._openPopup(this._name, this._link);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeClick());
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick());
    this._cardImage.addEventListener('click', () => this._handleImageClick());
  }

  generateCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}
