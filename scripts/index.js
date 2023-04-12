let openPopupEditBtn = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close-button');
// Находим значение Имени и Профессии на странице 
let getProfileName = document.querySelector('.profile__name');
let getProfileProfession = document.querySelector('.profile__profession');
// Находим поля формы в DOM заменяя их значениями Имени и Профессии
let nameInput = document.querySelector('.popup__input-item_profile_name');
let jobInput = document.querySelector('.popup__input-item_profile_profission');
// Выберем элементы, куда должны быть вставлены значения полей
let putProfileName = document.querySelector('.profile__name');
let putProfileProfession = document.querySelector('.profile__profession');

// Функция открытия попапа
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = getProfileName.textContent;
  jobInput.value = getProfileProfession.textContent;
}

// Функция закрытия попапа
function closePopup() {
  popup.classList.remove('popup_opened');
}

//Открываем и Закрываем попап
openPopupEditBtn.addEventListener('click', openPopup);
popup.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
    closePopup();
  }
});

// Находим форму в DOM
let formElement = document.querySelector('.popup__input');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Вставим новые значения с помощью textContent
  putProfileName.textContent = nameInput.value;
  putProfileProfession.textContent = jobInput.value;

  closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);


