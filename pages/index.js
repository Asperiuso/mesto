let openPopupEditBtn = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close-button');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup(evt) {
  let isOverlay = evt.target.classList.contains('popup');
  let isCloseBtn = evt.target.classList.contains('popup__close-button');

  if (isOverlay || isCloseBtn) {
    popup.classList.remove('popup_opened')
  }
}

openPopupEditBtn.addEventListener('click', openPopup);
popup.addEventListener('click', closePopup);

let getProfileName = document.querySelector('.profile__name').textContent;
let getProfileProfession = document.querySelector('.profile__profession').textContent;

let Name = document.querySelector('.popup__input-item_profile_name').value = getProfileName;
let Profession = document.querySelector('.popup__input-item_profile_profission').value = getProfileProfession;




