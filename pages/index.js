const openPopupEditBtn = document.querySelector('.profile__edit-button');
const popup  = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.popup__close-button');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup(evt) {
  const isOverlay = evt.target.classList.contains('popup');
  const isCloseBtn = evt.target.classList.contains('popup__close-button');

  if (isOverlay || isCloseBtn) {
    popup.classList.remove('popup_opened')
  }
}

openPopupEditBtn.addEventListener('click', openPopup);
popup.addEventListener('click', closePopup);

const getProfileName = document.querySelector('.profile__name').textContent;
const getProfileProfession = document.querySelector('.profile__profession').textContent;

const Name = document.querySelector('.popup__input-item_profile_name').value = getProfileName;
const Profession = document.querySelector('.popup__input-item_profile_profission').value = getProfileProfession;
