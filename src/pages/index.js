import '../pages/index.css';
import {
  validationConfig,
  formInputName,
  formInputJob,
  btnEdit,
  btnAdd,
  formCard,
  formProfile,
  buttonAvatar,
  formAvatar,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import Api from "../components/Api.js";

const formCardValidator = new FormValidator(validationConfig, formCard);
const formProfileInfoValidator = new FormValidator(validationConfig, formProfile);
const formAvatarValidator = new FormValidator(validationConfig, formAvatar);

const profileInfo = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__profession",
  avatarSelector: ".profile__avatar",
});

let userId;

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-69",
  headers: {
    authorization: "d30a28cc-3f89-4e69-baa3-301026382752",
    "Content-Type": "application/json",
  },
});

const popupWithImage = new PopupWithImage(".popup-card");

const cardList = new Section(
  {
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      //console.log(cardElement);
      cardList.addItem(cardElement);
    },
  },
  ".area"
);

function createCard(cardData) {
  const card = new Card(
    {
      name: cardData.name,
      link: cardData.link,
      likes: cardData.likes,
      userId,
      ownerId: cardData.owner._id,
      id: cardData._id
    },
    '#card-template',
    openCard,
    async () => {
      try {
        const res = await api.like(cardData._id);
        card.like();
        card.setLikesCount(res);
      } catch (err) {
        console.warn(err)
      }
    },
    async () => {
      try {
        const res = await api.dislike(cardData._id);
        card.dislike();
        card.setLikesCount(res);
      } catch (err) {
        console.warn(err)
      }
    },
    () => {
      confirmPopup.open(card)
    }
  );

  return card.generateCard();
}


const popupNewCard = new PopupWithForm(".popup-add", {
  handleFormSubmit: (formValues, popupButtonSubmit) => {
    renderLoading(true, popupButtonSubmit, popupButtonSubmit.textContent);
    api
      .addNewCard(formValues)
      .then(({ name, link, likes, owner, _id }) => {
        const cardElement = createCard({ name, link, likes, owner, _id });
        cardList.addItem(cardElement);
        popupNewCard.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        renderLoading(false, popupButtonSubmit, "Создать");
      });
  },
});

const popupEditProfile = new PopupWithForm(".popup-edit", {
  handleFormSubmit: (formValues, popupButtonSubmit) => {
    renderLoading(true, popupButtonSubmit, popupButtonSubmit.textContent);
    api
      .setUserInfo(formValues)
      .then((userInfo) => {
        profileInfo.setUserInfo(userInfo);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        renderLoading(false, popupButtonSubmit, "Сохранить");
      });
  },
});

const confirmPopup = new PopupWithConfirmation(".popup-delete", {
  handleFormSubmit: (card) => {
    api.deleteCard(card._id)
      .then(() => {
        card.delete();
        confirmPopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  },
});

const popupAvatar = new PopupWithForm('.popup-avatar', {
  handleFormSubmit: (formValues, popupButtonSubmit) => {
    renderLoading(true, popupButtonSubmit, popupButtonSubmit.textContent);
    
    const avatarUrl = formValues[""]; 
    const updatedFormValues = { avatar: avatarUrl }; 
  
    api.setUserAvatar(updatedFormValues)
      .then((res) => {
        profileInfo.setUserAvatar(res);
        popupAvatar.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        renderLoading(false, popupButtonSubmit, 'Сохранить');
      });
  },
});

function renderLoading(isLoading, popupButtonSubmit, initialButtonText) {
  if (isLoading) {
    popupButtonSubmit.textContent = "Сохранение...";
  } else {
    popupButtonSubmit.textContent = initialButtonText;
  }
}

buttonAvatar.addEventListener('click', () => {
  popupAvatar.open();
  formAvatarValidator.revalidateForm();
})

function openCard(image, name) {
  popupWithImage.open(image, name)
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, initialCards]) => {
    userId = userInfo._id;

    profileInfo.setUserInfo(userInfo);

    cardList.renderItems(initialCards);
  })
  .catch((err) => {
    console.error(err);
  });

btnAdd.addEventListener("click", () => {
  formCardValidator.revalidateForm();
  popupNewCard.open();
});

btnEdit.addEventListener("click", () => {
  formProfileInfoValidator.revalidateForm();
  const currentUserInfo = profileInfo.getUserInfo();
  formInputName.value = currentUserInfo.name;
  formInputJob.value = currentUserInfo.about;
  popupEditProfile.open();
});


popupWithImage.setEventListeners();
popupNewCard.setEventListeners();
popupEditProfile.setEventListeners();
confirmPopup.setEventListeners();
popupAvatar.setEventListeners();

formCardValidator.enableValidation();
formProfileInfoValidator.enableValidation();
formAvatarValidator.enableValidation();

