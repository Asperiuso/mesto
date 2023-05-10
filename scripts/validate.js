const mestoSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input-item_error',
  errorClass: 'popup__input-error-message_active'
};

const formList = Array.from(document.querySelectorAll(mestoSelectors.formSelector));
// const inputList = Array.from(document.querySelectorAll(mestoSelectors.inputSelector));


const showError = (inputEl, mestoSelectors, errorMessage) => {
  const errorElement = document.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(mestoSelectors.inputErrorClass);
  errorElement.classList.add(mestoSelectors.errorClass);
  errorElement.textContent = errorMessage;
};

const hideError = (inputEl, mestoSelectors) => {
  const errorElement = document.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(mestoSelectors.inputErrorClass);
  errorElement.classList.remove(mestoSelectors.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (inputEl, mestoSelectors) => {
  if (!inputEl.validity.valid) {
    inputEl.setCustomValidity('')
    if (inputEl.validity.valid) {
      inputEl.setCustomValidity("Вы пропустили это поле.")
    }
    if (inputEl.validity.typeMismatch) {
      inputEl.setCustomValidity("Введите адрес сайта.")
    }
    showError(inputEl, mestoSelectors, inputEl.validationMessage);
      } else {
    hideError(inputEl, mestoSelectors);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputEl => {
    return !inputEl.validity.valid;
  });
};

const inactiveSubmitBtn = (btnEl, { inactiveButtonClass }) => {
  btnEl.classList.add(inactiveButtonClass);
  btnEl.disabled = true;
};

const activeSubmitBtn = (btnEl, { inactiveButtonClass }) => {
  btnEl.classList.remove(inactiveButtonClass);
  btnEl.disabled = false;
};

const toggleBtn = (inputList, btnEl, mestoSelectors) => {
  if (hasInvalidInput(inputList)) {
    inactiveSubmitBtn(btnEl, mestoSelectors);
  } else {
    activeSubmitBtn(btnEl, mestoSelectors);
  };
};

const setEventListeners = (formEl, mestoSelectors) => {
  const inputList = Array.from(formEl.querySelectorAll(mestoSelectors.inputSelector));
  const btnEl = formEl.querySelector(mestoSelectors.submitButtonSelector);
  toggleBtn(inputList, btnEl, mestoSelectors);
  inputList.forEach(inputEl => {
    inputEl.addEventListener('input', () => {
      checkInputValidity(inputEl, mestoSelectors);
      toggleBtn(inputList, btnEl, mestoSelectors);
    });
  });
};

const revalidateForm = (formEl, mestoSelectors) => {
  const inputList = Array.from(formEl.querySelectorAll(mestoSelectors.inputSelector));
  const btnEl = formEl.querySelector(mestoSelectors.submitButtonSelector);
  inputList.forEach(inputEl => {
    hideError(inputEl, mestoSelectors);
  });
  inactiveSubmitBtn(btnEl, mestoSelectors);
};

const enableValidation = (mestoSelectors) => {
  formList.forEach(formEl => {
    setEventListeners(formEl, mestoSelectors);
  });
};

/*$('input').on('input invalid', function() {

  if (this.validity.typeMismatch) {
    this.setCustomValidity("Не соответствует типу")
  }
  if (this.validity.patternMismatch) {
    this.setCustomValidity("Не соответствует паттерну")
  }
})*/

enableValidation(mestoSelectors);