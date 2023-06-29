import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._inputList = this._popup.querySelectorAll('.popup__input-item');
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupButtonSubmit = this._popup.querySelector('.popup__save-button');
    this._getInputValues = this._getInputValues.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _getInputValues() {
    const formValues = {};

    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setInputValues(inputValues) {
    this._inputList.forEach((input) => {
      input.value = inputValues[input.name];
    });
  }

  _handleSubmit(evt) {
    evt.preventDefault();

    const formValues = this._getInputValues();

    this._handleFormSubmit(formValues, this._popupButtonSubmit);

  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._handleSubmit);
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
