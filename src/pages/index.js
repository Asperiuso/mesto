import '../pages/index.css';
import {
  validationConfig,
  formInputName,
  formInputJob,
  btnEdit,
  btnAdd,
  formCard,
  formProfile
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import initialCards from "../utils/db.js"

const formCardValidator = new FormValidator(validationConfig, formCard);
const formProfileInfoValidator = new FormValidator(validationConfig, formProfile);

const profileInfo = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__profession",
});

const popupWithImage = new PopupWithImage(".popup-card");

const cardList = new Section(
  {
    renderer: (item) => {
      const card = new Card(item, "#card-template", (name, link) => {
        popupWithImage.open(link, name);
      });
      return card.generateCard();
    }
  },
  '.area'
);

// Генерируем первоначальные карточки из массива initialCards
initialCards.reverse().forEach((cardData) => {
  const cardElement = cardList._renderer(cardData);
  cardList.addItem(cardElement);
});

const popupNewCard = new PopupWithForm(".popup-add", {
  handleFormSubmit: (formValues) => {
    // Создание новой карточки
    const { cardTitle, cardLink } = formValues;
    const cardElement = new Card({ name: cardTitle, link: cardLink }, "#card-template", (name, link) => {
      popupWithImage.open(link, name);
    }).generateCard();
    
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

popupWithImage.setEventListeners();
popupNewCard.setEventListeners();
popupEditProfile.setEventListeners();

formCardValidator.enableValidation();
formProfileInfoValidator.enableValidation();
