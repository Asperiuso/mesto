import initialCards from './db.js';

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
const formProfile = document.querySelector('#editProfile');
const formCard = document.querySelector('#editCard');
const area = document.querySelector('.area')
//Модальные константы
const modalImg = popupInputCard.querySelector('img');
const modalText = popupInputCard.querySelector('.popup__card-title');
//Переменная попапа
const popups = document.querySelectorAll('.popup');
const popupsElement = Array.from(popups);

//Функция закрытия попапа
function closePopup(popups) {
  popups.classList.remove('popup_opened')
}

// Функция открытия попапа
function openPopup(popups) {
  popups.classList.add('popup_opened');
}

popupsElement.forEach(el => {
  el.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(el);
    }
  });
});

//Функция добавления элементов
function addCards(name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });
  cardElement.querySelector('.card__del-button').addEventListener('click', function (evt) {
    (evt.target.closest('.card')).remove();
  });

  cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
    modalImg.src = evt.target.src;
    modalImg.alt = evt.target.alt;
    modalText.textContent = evt.target.alt;
    openPopup(popupInputCard);
  });

  return cardElement;

};

initialCards.forEach(function (el) {
  area.insertAdjacentElement('beforeend', addCards(el.name, el.link))
});

// Обработчик «отправки» форм
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
  area.insertAdjacentElement('afterbegin', addCards(titleInputCard.value, linkInputCard.value));
  closePopup(popupAdd);
}
formCard.addEventListener('submit', submitFormAdd);

btnEdit.addEventListener('click', function () {
  formInputName.value = inputProfileName.textContent;
  formInputJob.value = inputProfileProfession.textContent;
  openPopup(popupEdit);
});

btnAdd.addEventListener('click', function () {
  titleInputCard.value = '';
  linkInputCard.value = '';
  openPopup(popupAdd);
});


