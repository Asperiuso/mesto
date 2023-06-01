export default class Card {
  constructor(data, cardSelector, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _handleLikeClick() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleImageClick() {
    const modalImg = document.querySelector('.popup-card').querySelector('img');
    const modalText = document.querySelector('.popup-card').querySelector('.popup__card-title');
    modalImg.src = this._link;
    modalImg.alt = this._name;
    modalText.textContent = this._name;
    this._openPopup(this._name, this._link); // Передача аргументов name и link
  }

  _setEventListeners() {
    this._element
      .querySelector('.card__like-button')
      .addEventListener('click', () => this._handleLikeClick());
    this._element
      .querySelector('.card__del-button')
      .addEventListener('click', () => this._handleDeleteClick());
    this._element
      .querySelector('.card__image')
      .addEventListener('click', () => this._handleImageClick());
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}
