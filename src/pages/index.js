import "./index.css";
import {
  initialCards,
  settings,
  formEditPopup,
  formAddPopup,
  photoList,
  addButton,
  editButton,
} from "../utils/constants.js";
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const popupFullRes = new PopupWithImage(".popup-full-image");

//↑ Инициализация экземпляра класса PopupWithImage.

function createNewCard(data) {
  const card = new Card(
    {
      handleCardClick: (heading, imgLink) => {
        popupFullRes.open(heading, imgLink);
        popupFullRes.setEventListener();
      },
      heading: data.name,
      imgLink: data.link,
    },
    "#card-template"
  );
  const generatedCard = card.generateCard();
  return generatedCard;
}

//↑ Функция, которая создаёт и возвращает новую карточку.

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const generatedCard = createNewCard(data);
      cardList.addItemAppend(generatedCard);
    },
  },
  photoList
);

cardList.renderItems();

//↑ Инициализация экземпляра слоя Section и вызов его метода, который берёт данные из массива initialCards, добавляет их в карточки и загружает на страницу.

const user = new UserInfo({
  userName: ".profile__title",
  userOccupation: ".profile__subtitle",
});

//↑ Инициализация экземпляра класса UserInfo.

const formEditPopupInstance = new FormValidator(settings, formEditPopup);
formEditPopupInstance.enableValidation();

const formAddPopupInstance = new FormValidator(settings, formAddPopup);
formAddPopupInstance.enableValidation();

//↑ Включение валидации форм

const popupAddCard = new PopupWithForm(".popup-add-place", (data) => {
  const generatedCard = createNewCard(data);
  cardList.addItemPrepend(generatedCard);
  popupAddCard.close();
});
popupAddCard.setEventListener();

//↑ Инициализация экземпляра класса popupWithForm для попапа с добавлением новой карточки

addButton.addEventListener("click", () => {
  popupAddCard.clearInputValues();
  popupAddCard.open();
  formAddPopupInstance.enableValidation();
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
  formEditPopupInstance.enableValidation();
  popupEditProfile.open();
});

//↑ Обработчик события, который открывает попап с данными о пользователе и включает проверку валидации для полей формы
