import initialCards from './db.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Находим значение Имени и Профессии на странице
const inputProfileName = document.querySelector('.profile__name');
const inputProfileProfession = document.querySelector('.profile__profession');
// Находим поля формы в DOM
const formInputName = document.querySelector('.popup__input-item_profile_name');
const formInputJob = document.querySelector('.popup__input-item_profile_profission');
const titleInputCard = document.querySelector('.popup__input-item_card_title');
const linkInputCard = document.querySelector('.popup__input-item_card_link');
// Выберем элементы, куда должны быть вставлены значения полей
const popupInputCard = document.querySelector('.popup-card');
const btnEdit = document.querySelector('.profile__edit-button');
const btnAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup-add');
const popupEdit = document.querySelector('.popup-edit');
// Находим форму в DOM
const formProfile = document.forms['editProfile'];
const formCard = document.forms['editCard'];
const area = document.querySelector('.area');
// Модальные константы
const modalImg = popupInputCard.querySelector('img');
const modalText = popupInputCard.querySelector('.popup__card-title');
// Переменная попапа
const popups = document.querySelectorAll('.popup');
const popupsList = Array.from(popups);

const formValidator = new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__input-item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input-item_error',
  errorClass: 'popup__input-error-message_active'
});

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

// Обработчик «отправки» формы редактирования профиля
function submitFormEdit(evt) {
  evt.preventDefault();
  inputProfileName.textContent = formInputName.value;
  inputProfileProfession.textContent = formInputJob.value;
  closePopup(popupEdit);
}
// Прикрепляем обработчик к форме:
formProfile.addEventListener('submit', submitFormEdit);

// Обработчик для добавления карточек
function submitFormAdd(evt) {
  evt.preventDefault();
  const card = new Card({ name: titleInputCard.value, link: linkInputCard.value }, '#card-template', openPopupWithImage);
  const cardElement = card.generateCard();
  area.prepend(cardElement);
  evt.target.reset();
  closePopup(popupAdd);
}

formCard.addEventListener('submit', submitFormAdd);

// Функция открытия изображения попапа
function openPopupWithImage(name, link) {
  modalText.textContent = name;
  modalImg.src = link;
  modalImg.alt = name;
  openPopup(popupInputCard);
}

// Добавим кнопкам проверку при каждом открытии
btnEdit.addEventListener('click', function () {
  formValidator.enableValidation();
  openPopup(popupEdit);
});
btnAdd.addEventListener('click', function () {
  formValidator.enableValidation();
  openPopup(popupAdd);
});

// Генерация первоначальных карточек из db.js
initialCards.forEach((cardData) => {
  const card = new Card(cardData, '#card-template', openPopupWithImage);
  const cardElement = card.generateCard();
  area.append(cardElement);
});

// Функция закрытия попапа нажатием на Esc
function closePopupOnEsc(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}

formValidator.enableValidation();
