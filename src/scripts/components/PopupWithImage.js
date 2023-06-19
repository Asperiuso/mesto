import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__card-image');
    this._popupCaption = this._popup.querySelector('.popup__card-title');
  }

  open(imageUrl, imageCaption) {
    this._popupImage.src = imageUrl;
    this._popupImage.alt = imageCaption;
    this._popupCaption.textContent = imageCaption;
    super.open();
  }
}
