import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings, forms, photoList, addButton, editButton } from "../utils/constants.js";

const cardList = new Section(
  {
    items: initialCards,
    renderer: (elem) => {
      const card = new Card(
        {
          handleCardClick: (heading, imgLink) => {
            const popup = new PopupWithImage(
              ".popup-full-image",
              imgLink,
              heading
            );
            popup.open();
            popup.setEventListener();
          },
        
        heading: elem.name,
        imgLink: elem.link
        },
        "#card-template"
      )
      
      const generatedCard = card.generateCard();
      cardList.addItem(generatedCard);
    },
  },
  photoList
);

cardList.renderItems();

// ↑ Создаём карточки из массива initialCards и добавляем их на страницу. 

const user = new UserInfo({
  userName: ".profile__title",
  userOccupation: ".profile__subtitle",
});

//↑ Инициализация экземпляра класса UserInfo.

const enableFormsValidation = new Section(
  {
    items: forms,
    renderer: (form) => {
      const validatedForm = new FormValidator(settings, form);
      validatedForm.enableValidation();
    },
  },
  ""
);

enableFormsValidation.renderItems();

//↑ Включение валидации форм


const popupAddCard = new PopupWithForm(".popup-add-place", (inputContent) => {
  const card = new Card(
    {
      handleCardClick: (heading, imgLink) => {
        const popup = new PopupWithImage(".popup-full-image", imgLink, heading);
        popup.open();
        popup.setEventListener();
      },
    heading: inputContent.place,
    imgLink: inputContent.link,
    },
    "#card-template"
  );

  const generatedCard = card.generateCard();
  cardList.addItemPrepend(generatedCard);
  popupAddCard.close();
});
popupAddCard.setEventListener();

//↑ Инициализация экземпляра класса popupWithForm для попапа с добавлением новой карточки

addButton.addEventListener("click", () => {
  popupAddCard.open();
  enableFormsValidation.renderItems();
});

//↑ Обработчик события, который открывает попап с добавлением карточки и включает проверку валидации для полей формы


const popupEditProfile = new PopupWithForm(
  ".popup-edit-profile",
  (userData) => {
    user.setUserInfo({
      newName: userData.name,
      newOccupation: userData.about,
    });

    popupEditProfile.close();
  }
);
popupEditProfile.setEventListener();

//↑ Инициализация экземпляра класса popupWithForm для попапа с данными о пользователе

editButton.addEventListener("click", () => {
  popupEditProfile.setInputValues(user.getUserInfo());
  enableFormsValidation.renderItems();
  popupEditProfile.open();
  
});

//↑ Обработчик события, который открывает попап с данными о пользователе и включает проверку валидации для полей формы

