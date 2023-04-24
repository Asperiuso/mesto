const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Находим значение Имени и Профессии на странице 
const getProfileName = document.querySelector('.profile__name');
const getProfileProfession = document.querySelector('.profile__profession');
// Находим поля формы в DOM 
let nameInput = document.querySelector('.popup__input-item_profile_name');
let jobInput = document.querySelector('.popup__input-item_profile_profission');
let CardTitleInput = document.querySelector('.popup__input-item_card_title');
let CardLinkInput = document.querySelector('.popup__input-item_card_link');
// Выберем элементы, куда должны быть вставлены значения полей
let putProfileName = document.querySelector('.profile__name');
let putProfileProfession = document.querySelector('.profile__profession');
const popupCard = document.querySelector('.popup-card');
const editBtn = document.querySelector('.profile__edit-button');
const addCard = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup-add');
const popupEdit = document.querySelector('.popup-edit');
const popupCloseBtn = document.querySelectorAll('.popup__close-button');
const popups = document.querySelectorAll('.popup');
// Находим форму в DOM
let formProfile = document.querySelector('#editProfile');
let formCard = document.querySelector('#editCard');
const area = document.querySelector('.area')

//Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

//Функция добавления элементов
function addCards(name, link)  {
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
    popupCard.querySelector('img').src = evt.target.src;
    popupCard.querySelector('.popup__card-title').textContent = evt.target.alt;
    openPopup(popupCard);
});

  return cardElement;

};

initialCards.forEach(function (el) {
  area.insertAdjacentElement('beforeend', addCards(el.name, el.link))
});

// Функция открытия попапа
function openPopup(popup) {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
  nameInput.value = getProfileName.textContent;
  jobInput.value = getProfileProfession.textContent;
  CardTitleInput.value = '';
  CardLinkInput.value = '';
  popup.classList.add('popup_opened');
}

// Обработчик «отправки» форм
function handleFormSubmit(evt) {
  evt.preventDefault();
  putProfileName.textContent = nameInput.value;
  putProfileProfession.textContent = jobInput.value;
  closePopup(popupEdit);
}

function formCardSubmit(evt) {
  evt.preventDefault();
  area.insertAdjacentElement('afterbegin', addCards(CardTitleInput.value, CardLinkInput.value));
  closePopup(popupAdd);
}

editBtn.addEventListener('click', function () {
  openPopup(popupEdit);
});

addCard.addEventListener('click', function () {
  openPopup(popupAdd);
});

// Прикрепляем обработчик к формам:

formProfile.addEventListener('submit', handleFormSubmit);

formCard.addEventListener('submit', formCardSubmit);

