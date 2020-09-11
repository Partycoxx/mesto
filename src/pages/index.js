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
import Api from "../components/Api.js";



const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    authorization: '1fc0b639-a579-4abe-9981-a2f8e932c357',
    'Content-Type': 'application/json'
  }
})

//↑ Инициализация экземпляра класса Api

const user = new UserInfo({
  userName: ".profile__title",
  userOccupation: ".profile__subtitle",
});

//↑ Инициализация экземпляра класса UserInfo.

api.getUserInfo()
.then(data => {
  user.setUserInfo({newName: data.name, newOccupation: data.about});
  user.setUserAvatar({avatarLink: data.avatar});
})
.catch(err => console.log(err));

//↑ Загрузка информации о пользователе с помощью метода Api !!!!!! Обновить catch, добавить подсос аватарки.


const cardList = new Section(
  {
    items: [] ,
    renderer: (data) => {
      const generatedCard = createNewCard(data);
      cardList.addItemAppend(generatedCard);
    },
  },
  photoList
);

//↑ Инициализация экземпляра класса Section


api.getCardList()
.then(data => {
  cardList.setItems(data.map(item => item))
  cardList.renderItems();
})
.catch(err => console.log(err));

//↑ Загрузка данных карточек с сервера + рендеринг карточек с помощью слоя Section.

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


const formEditPopupInstance = new FormValidator(settings, formEditPopup);
formEditPopupInstance.enableValidation();

const formAddPopupInstance = new FormValidator(settings, formAddPopup);
formAddPopupInstance.enableValidation();

//↑ Включение валидации форм

const popupAddCard = new PopupWithForm(
  ".popup-add-place",
  (data) => {
  api.addNewCard({
    dataName: data.name, 
    dataLink: data.link
  })
  .then(data => {
    const generatedCard = createNewCard(data);
    cardList.addItemPrepend(generatedCard);
    popupAddCard.close();
  })
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
    api.editUserInfo({
      newName: userData.name,
      newOccupation: userData.about,
    })
    .then(data => {
      user.setUserInfo({
        newName: data.name,
        newOccupation: data.about,
      })
    })
    .catch(err => console.log(err));
    popupEditProfile.close();
  }
);
popupEditProfile.setEventListener();

//↑ Инициализация экземпляра класса popupWithForm для попапа с данными о пользователе.
// В коллбэке отправляем новые имя и занятие пользователя на сервер с помощью метода editUserInfo, 
// успешный ответ передаём в метод setUserInfo, который обновляет данные на странице.   

editButton.addEventListener("click", () => {
  popupEditProfile.setInputValues(user.getUserInfo());
  formEditPopupInstance.enableValidation();
  popupEditProfile.open();
});

//↑ Обработчик события, который открывает попап с данными о пользователе и включает проверку валидации для полей формы
