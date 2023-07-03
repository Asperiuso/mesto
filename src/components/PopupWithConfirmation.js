import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector(".popup__save-button");
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Удаление...";
    } else {
      this._submitButton.textContent = "Да";
    }
  }

  open(card) {
    super.open();
    this._cardElement = card;
    this._cardId = card.id;
  }

  setFormSubmitHandler(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();

    if (this._isLoading) {
      return;
    }

    this._handleFormSubmit(this._cardElement, this._cardId);
  };

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", this._handleSubmit);
  }
}
