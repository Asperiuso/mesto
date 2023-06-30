import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._isLoading = false; 
    this._submitButton = this._popup.querySelector(".popup__save-button");
  }

  setLoading(isLoading) {
    this._isLoading = isLoading;
    if (isLoading) {
      this._submitButton.textContent = "Удаление...";
    } else {
      this._submitButton.textContent = "Да";
    }
  }

  open(card) {
    super.open();
    this._cardElement = card;
    this._cardId = card._id;
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();

    if (this._isLoading) {
      return; 
    }

    this.setLoading(true); 
    this._handleFormSubmit(this._cardElement, this._cardId)
      .then(() => {
        this.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", this._handleSubmit);
  }
}