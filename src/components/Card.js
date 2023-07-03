export default class Card {
  constructor(cardData, selector, openCard, like, dislike, deleteCard) {
    this._title = cardData.name;
    this._image = cardData.link;
    this._selector = selector;
    this._openCard = openCard;
    this._id = cardData.id;
    this._likes = cardData.likes;
    this._userId = cardData.userId;
    this._ownerId = cardData.ownerId;
    this._deleteCard = deleteCard;
    this._like = like;
    this._dislike = dislike;
  }

  _getElement() {
    const cardTemplate = document
      .querySelector(this._selector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardTemplate;
  }

  generateCard() {
    this._element = this._getElement();
    this._imageElement = this._element.querySelector('.card__image');
    this._imageElement.src = this._image;
    this._imageElement.alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._deleteButton = this._element.querySelector('.card__del-button');
    this._likeCounter.textContent = `${this._likes.length}`;
    this._setEventListeners();
    this._isLiked();
    this.isOwner();
    return this._element;
  }

  _setEventListeners() {
    this._imageElement.addEventListener('click', () => {
      this._openCard(this._image, this._title);
    });

    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('card__like-button_active')) {
        this._dislike();
      } else {
        this._like();
      }
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick();
    });
  }

  isOwner() {
    if (this._userId !== this._ownerId) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }
  }

  _checkCardOwner() {
    if (this._ownerId !== this._userId) {
      this._deleteCard();
      return false;
    }
    return true;
  }

  _isLiked() {
    this._likes.forEach((user) => {
      if (user._id === this._userId) {
        this.like();
      } else {
        this.dislike();
      }
    });
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle('card__like-button_active');
  }

  like() {
    this._likeButton.classList.add('card__like-button_active');
  }

  dislike() {
    this._likeButton.classList.remove('card__like-button_active');
  }

  setLikesCount(res) {
    this._likeCounter.textContent = `${res.likes.length}`;
  }

  _handleDeleteClick() {
    this._deleteCard(this._id);
  }

  delete() {
    this._element.remove();
    this._element = null;
  }
}
