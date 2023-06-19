export default class FormValidator {
  constructor(validationConfig, formEl) {
    this._validationConfig = validationConfig;
    this._formEl = formEl;
    this._inputList = Array.from(this._formEl.querySelectorAll(this._validationConfig.inputSelector));
    this._btnEl = this._formEl.querySelector(this._validationConfig.submitButtonSelector);
  }

  _showError(inputEl) {
    const errorElement = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._validationConfig.inputErrorClass);
    errorElement.classList.add(this._validationConfig.errorClass);
    errorElement.textContent = inputEl.validationMessage;
  }

  _hideError(inputEl) {
    const errorElement = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      inputEl.setCustomValidity('');
      /*Добавление записей валидации согласно макету
      if (inputEl.validity.valid) {
        inputEl.setCustomValidity('Вы пропустили это поле.');
      }
      if (inputEl.validity.typeMismatch) {
        inputEl.setCustomValidity('Введите адрес сайта.');
      }*/

      this._showError(inputEl);
    } else {
      this._hideError(inputEl);
    }

  }

  _hasInvalidInput() {
    return this._inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }

  _disableBtn() {
    this._btnEl.classList.add(this._validationConfig.inactiveButtonClass);
    this._btnEl.disabled = true;
  }

  _activateBtn() {
    this._btnEl.classList.remove(this._validationConfig.inactiveButtonClass);
    this._btnEl.disabled = false;
  }

  _toggleBtn() {
    if (this._hasInvalidInput()) {
      this._disableBtn();
    } else {
      this._activateBtn();
    }
  }

  _setEventListeners() {
    this._formEl.addEventListener('reset', () => {
      this._disableBtn();
    });

    this._toggleBtn();

    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        this._checkInputValidity(inputEl);
        this._toggleBtn();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  revalidateForm() {
    this._toggleBtn();
    this._inputList.forEach((inputEl) => {
      this._hideError(inputEl);
    });
  }
}
