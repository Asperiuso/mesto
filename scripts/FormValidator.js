export default class FormValidator {
  constructor(mestoSelectors) {
    this._mestoSelectors = mestoSelectors;
  }
  _showError(inputEl) {
    const errorElement = document.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._mestoSelectors.inputErrorClass);
    errorElement.classList.add(this._mestoSelectors.errorClass);
    errorElement.textContent = inputEl.validationMessage;
  }

  _hideError(inputEl) {
    const errorElement = document.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._mestoSelectors.inputErrorClass);
    errorElement.classList.remove(this._mestoSelectors.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      inputEl.setCustomValidity('');

      if (inputEl.validity.valid) {
        inputEl.setCustomValidity('Вы пропустили это поле.');
      }

      if (inputEl.validity.typeMismatch) {
        inputEl.setCustomValidity('Введите адрес сайта.');
      }

      this._showError(inputEl);
    } else {
      this._hideError(inputEl);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputEl => {
      return !inputEl.validity.valid;
    });
  }

  _disableBtn(btnEl) {
    btnEl.classList.add(this._mestoSelectors.inactiveButtonClass);
    btnEl.disabled = true;
  }

  _activateBtn(btnEl) {
    btnEl.classList.remove(this._mestoSelectors.inactiveButtonClass);
    btnEl.disabled = false;
  }

  _toggleBtn(inputList, btnEl) {
    if (this._hasInvalidInput(inputList)) {
      this._disableBtn(btnEl);
    } else {
      this._activateBtn(btnEl);
    }
  }

  _setEventListeners(formEl) {
    const inputList = Array.from(formEl.querySelectorAll(this._mestoSelectors.inputSelector));
    const btnEl = formEl.querySelector(this._mestoSelectors.submitButtonSelector);

    formEl.addEventListener('reset', () => {
      this._disableBtn(btnEl);
    });

    this._toggleBtn(inputList, btnEl);

    inputList.forEach(inputEl => {
      inputEl.addEventListener('input', () => {
        this._checkInputValidity(inputEl);
        this._toggleBtn(inputList, btnEl);
      });
    });
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._mestoSelectors.formSelector));

    formList.forEach(formEl => {
      this._setEventListeners(formEl);
    });
  }

  revalidateForm(formEl) {
    const inputList = Array.from(formEl.querySelectorAll(this._mestoSelectors.inputSelector));
    const btnEl = formEl.querySelector(this._mestoSelectors.submitButtonSelector);

    this._toggleBtn(inputList, btnEl);
    inputList.forEach(inputEl => {
      this._hideError(inputEl);
    });
  }
}