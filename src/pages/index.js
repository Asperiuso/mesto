import {
  validationConfig,
  formInputName,
  formInputJob,
  btnEdit,
  btnAdd,
  area,
  formCard,
  formProfile
} from "../scripts/utils/constants.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import initialCards from "../scripts/utils/db.js"

const formCardValidator = new FormValidator(validationConfig, formCard);
const formProfileInfoValidator = new FormValidator(validationConfig, formProfile);

const profileInfo = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__profession",
});

const cardList = new Section({
  renderer: item => {
    return create(item);
  }
}, '.area')

const popupWithImage = new PopupWithImage(".popup-card");

const create = (cardData) => {
  const card = new Card(cardData, "#card-template", (name, link) => {
    popupWithImage.open(link, name);
  });
  
  return card.generateCard();
}

// Генерируем первоначальные карточки из массива initialCards
initialCards.forEach((cardData) => {
  const cardElement = create(cardData);
  area.append(cardElement);
  });
  
const popupNewCard = new PopupWithForm(".popup-add", {
  handleFormSubmit: (formValues) => {
    // Создание новой карточки
    const { Card_title, Card_link } = formValues;
    const cardElement = create({ name: Card_title, link: Card_link });
    
    // Добавление карточки в список
    cardList.addItem(cardElement);
  
    // Закрытие попапа
    popupNewCard.close();
  },
  
});

popupNewCard.setEventListeners();

btnAdd.addEventListener("click", () => {
  popupNewCard.open();
  formCardValidator.revalidateForm();
});

const popupEditProfile = new PopupWithForm(".popup-edit", {
  handleFormSubmit: (formValues) => {
    profileInfo.setUserInfo(formValues);
    // Закрытие попапа
    popupEditProfile.close();
  },
});

btnEdit.addEventListener("click", () => {
  const { name, about } = profileInfo.getUserInfo();

  formInputName.value = name;
  formInputJob.value = about;

  popupEditProfile.open();
  formProfileInfoValidator.revalidateForm();
});

btnAdd.addEventListener("click", () => {
  popupNewCard.open();

  formCardValidator.revalidateForm();
});

popupWithImage.setEventListeners();
popupNewCard.setEventListeners();
popupEditProfile.setEventListeners();

formCardValidator.enableValidation();
formProfileInfoValidator.enableValidation();

