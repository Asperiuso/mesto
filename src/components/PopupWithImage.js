import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__card-image');
    this._popupCaption = this._popup.querySelector('.popup__card-title');
  }

  open(image, name) {
    this._popupImage.src = image;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  }
}
