import initialCards from './db.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Конфигурация селекторов для валидации формы
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input-item_error',
  errorClass: 'popup__input-error-message_active'
};

// Находим элементы на странице
const inputProfileName = document.querySelector('.profile__name');
const inputProfileProfession = document.querySelector('.profile__profession');
const formInputName = document.querySelector('.popup__input-item_profile_name');
const formInputJob = document.querySelector('.popup__input-item_profile_profission');
const titleInputCard = document.querySelector('.popup__input-item_card_title');
const linkInputCard = document.querySelector('.popup__input-item_card_link');
const popupInputCard = document.querySelector('.popup-card');
const btnEdit = document.querySelector('.profile__edit-button');
const btnAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup-add');
const popupEdit = document.querySelector('.popup-edit');
const area = document.querySelector('.area');
const modalImg = popupInputCard.querySelector('img');
const modalText = popupInputCard.querySelector('.popup__card-title');
const popups = document.querySelectorAll('.popup');
const popupsList = Array.from(popups);

// Создаем экземпляр класса FormValidator для формы редактирования профиля
const formProfile = document.forms['editProfile'];
const formValidatorProfile = new FormValidator(validationConfig, formProfile);
formValidatorProfile.enableValidation();

const create = (cardData) => {
    const card = new Card(cardData, '#card-template', openPopupWithImage);
    return card.generateCard();
}

// Создаем экземпляр класса FormValidator для формы добавления карточек
const formCard = document.forms['editCard'];
const formValidatorCard = new FormValidator(validationConfig, formCard);
formValidatorCard.enableValidation();

// Функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
};

// Функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
};

// Добавляем обработчики событий для закрытия попапа
popupsList.forEach((el) => {
  el.addEventListener('mousedown', (evt) => {
    if (
      evt.target.classList.contains('popup_opened') ||
      evt.target.classList.contains('popup__close-button')
    ) {
      closePopup(el);
    }
  });
});

// Заполнение значений полей 
function fillProfileForm() {
  formInputName.value = inputProfileName.textContent;
  formInputJob.value = inputProfileProfession.textContent;
}

// Обработчик клика на кнопку редактирования профиля
btnEdit.addEventListener('click', function () {
  formValidatorProfile.revalidateForm();
  fillProfileForm();
  openPopup(popupEdit);
});


// Обработчик «отправки» формы редактирования профиля
function submitFormEdit(evt) {
  evt.preventDefault();
  inputProfileName.textContent = formInputName.value;
  inputProfileProfession.textContent = formInputJob.value;
  closePopup(popupEdit);
}

// Прикрепляем обработчик к форме редактирования профиля
formProfile.addEventListener('submit', submitFormEdit);

// Обработчик для добавления карточек
function submitFormAdd(evt) {
  evt.preventDefault();
  const cardElement = create({ name: titleInputCard.value, link: linkInputCard.value });
  area.prepend(cardElement);
  evt.target.reset();
  closePopup(popupAdd);
  formValidatorCard.revalidateForm();
}

// Прикрепляем обработчик к форме добавления карточек
formCard.addEventListener('submit', submitFormAdd);

// Функция открытия изображения в попапе
function openPopupWithImage(name, link) {
  modalText.textContent = name;
  modalImg.src = link;
  modalImg.alt = name;
  openPopup(popupInputCard);
}

// Добавляем обработчики для кнопок редактирования и добавления
btnEdit.addEventListener('click', function () {
  formValidatorProfile.revalidateForm();
  openPopup(popupEdit);
});

btnAdd.addEventListener('click', function () {
  formValidatorCard.revalidateForm();
  openPopup(popupAdd);
});

// Генерируем первоначальные карточки из массива initialCards
initialCards.forEach((cardData) => {
  const cardElement = create(cardData);
  area.append(cardElement);
});

// Функция закрытия попапа при нажатии на Esc
function closePopupOnEsc(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}


// Включаем валидацию формы редактирования профиля
formValidatorProfile.enableValidation();

// Включаем валидацию формы добавления карточек
formValidatorCard.enableValidation();
