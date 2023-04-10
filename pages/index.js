let openPopupEditBtn = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close-button');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup(evt) {
  let isOverlay = evt.target.classList.contains('popup');
  let isCloseBtn = evt.target.classList.contains('popup__close-button');
  let isSaveBtn = evt.target.classList.contains('popup__save-button');

  if (isOverlay || isCloseBtn || isSaveBtn) {
    popup.classList.remove('popup_opened')
  }
}

//Открываем и Закрываем попап
openPopupEditBtn.addEventListener('click', openPopup);
popup.addEventListener('click', closePopup);

// Находим форму в DOM
let formElement = document.querySelector('.popup__input');

// Находим значение Имени и Профессии на странице 
let getProfileName = document.querySelector('.profile__name').textContent;
let getProfileProfession = document.querySelector('.profile__profession').textContent;

// Находим поля формы в DOM заменяя их значениями Имени и Профессии
let nameInput = document.querySelector('.popup__input-item_profile_name').value = getProfileName;
let jobInput = document.querySelector('.popup__input-item_profile_profission').value = getProfileProfession;
console.log(nameInput);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получим значение полей jobInput и nameInput из свойства value
  nameInput = document.querySelector('.popup__input-item_profile_name').value;
  jobInput = document.querySelector('.popup__input-item_profile_profission').value;
  // Выберем элементы, куда должны быть вставлены значения полей
  let putProfileName = document.querySelector('.profile__name');
  let putProfileProfession = document.querySelector('.profile__profession');
  // Вставим новые значения с помощью textContent
  putProfileName.textContent = nameInput;  
  putProfileProfession.textContent = jobInput;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 


