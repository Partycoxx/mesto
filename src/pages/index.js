import "./index.css";
import {
  settings,
  formEditPopup,
  formAddPopup,
  formAddAvatar,
  photoList,
  addButton,
  editButton,
  addAvatarButton,
  ownerId,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithApprove from "../components/PopupWithApprove.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-15",
  headers: {
    authorization: "1fc0b639-a579-4abe-9981-a2f8e932c357",
    "Content-Type": "application/json",
  },
});

//↑ Инициализация экземпляра класса Api

const user = new UserInfo({
  userName: ".profile__title",
  userOccupation: ".profile__subtitle",
});

//↑ Инициализация экземпляра класса UserInfo.

const cardList = new Section(
  {
    items: [],
    renderer: (data) => {
      const generatedCard = createNewCard(data);
      cardList.addItemAppend(generatedCard);
    },
  },
  photoList
);

//↑ Инициализация экземпляра класса Section

const popupFullRes = new PopupWithImage(".popup-full-image");

//↑ Инициализация экземпляра класса PopupWithImage.

const popupApprove = new PopupWithApprove(".popup-delete");

//↑ Инициализация экземпляра класса PopupWithApprove.

function createNewCard(data) {
  const card = new Card(
    {
      handleCardClick: (heading, imgLink) => {
        popupFullRes.open(heading, imgLink);
        popupFullRes.setEventListener();
      },
      handleDeleteClick: (id, element) => {
        popupApprove.setData(id, element, (id, element) => {
          api
            .deleteCard({ cardId: id })
            .then((res) => {
              popupApprove.close();
              element.remove();
              element = null;
            })
            .catch((data) => alert(data));
        });
        popupApprove.setEventListener();
        popupApprove.open();
      },
      handleLikeCard: (id) => {
        api
          .likeCard({ cardId: id })
          .then((res) => {
            card.setLikes(res.likes.length);
          })
          .catch((data) => alert(data));
      },
      handleDislikeCard: (id) => {
        api
          .dislikeCard({ cardId: id })
          .then((res) => {
            card.setLikes(res.likes.length);
          })
          .catch((data) => alert(data));
      },
    },
    {
      newHeading: data.name,
      newImageLink: data.link,
      cardId: data._id,
      likes: data.likes,
      numberOfLikes: data.likes.length,
      cardOwnerId: data.owner._id,
    },
    "#card-template",
    ownerId
  );
  const generatedCard = card.generateCard();
  return generatedCard;
}

//↑ Функция, которая создаёт и возвращает новую карточку.
// Инстанс класса Card принимает 4 коллбэка, которые регулируют: 
//    handleCardClick — полноформатное отображение картинок;
//    handleDeleteClick — удаление карточки;
//    handleLikeCard — добавление лайка карточки;
//    handleDislikeCard — удаление лайка карточки. 
//Также принимает необходимые данные от сервера: 
//    Заголовок для карточки.
//    Ссылку на изображение.
//    ID карточки. 
//    Массив с лайкнувшими пользователями.
//    Количество лайкнувших пользователей.
//    ID создателя карточки.  


api
  .getInitialData()
  .then((data) => {
    const [userData, cardData] = data;

    user.setUserInfo({ newName: userData.name, newOccupation: userData.about });
    user.setUserAvatar({ avatarLink: userData.avatar });

    cardList.setItems(cardData.map((item) => item));
    cardList.renderItems();
  })
  .catch((err) => console.log(err));

  //↑ Отправляем запрос на сервер, в случае успеха — получаем данные о пользователе и карточки, рендерим карточки с помощью слоя Section.

const formEditPopupInstance = new FormValidator(settings, formEditPopup);
formEditPopupInstance.enableValidation();

const formAddPopupInstance = new FormValidator(settings, formAddPopup);
formAddPopupInstance.enableValidation();

const formAddAvatarInstance = new FormValidator(settings, formAddAvatar);
formAddAvatarInstance.enableValidation();

//↑ Включение валидации форм в попапах

const popupAddCard = new PopupWithForm(
  ".popup-add-place",
  (data, buttonElem) => {
    popupAddCard.setElemStatus(buttonElem, "Создание...");
    api
      .addNewCard({
        dataName: data.name,
        dataLink: data.link,
      })
      .then((data) => {
        const generatedCard = createNewCard(data);
        cardList.addItemPrepend(generatedCard);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((res) => {
        popupAddCard.setElemStatus(buttonElem, "Создать");
        popupAddCard.close();
      });
  }
);
popupAddCard.setEventListener();

//↑ Инициализация экземпляра класса popupWithForm для попапа с добавлением новой карточки.
//В коллбэке передаём данные из попапа, которые ввёл пользователь, и элемент кнопки. 
//Данные улетают на сервер, кнопка меняет вид.
//В случае успеха получаем ответ от сервера с обновлёнными именем пользователя и описанием и добавляем их на страницу.
//В случае неудачи выводим ошибку.
//В любом случае возвращаем кнопке исходный вид и закрываем попап.
//Остальные инстансы popupWithForm устроены по аналогии.

const popupEditProfile = new PopupWithForm(
  ".popup-edit-profile",
  (userData, buttonElem) => {
    popupEditProfile.setElemStatus(buttonElem, "Сохранение...");
    api
      .editUserInfo({
        newName: userData.name,
        newOccupation: userData.about,
      })
      .then((data) => {
        user.setUserInfo({
          newName: data.name,
          newOccupation: data.about,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((res) => {
        popupEditProfile.setElemStatus(buttonElem, "Сохранить");
        popupEditProfile.close();
      });
  }
);
popupEditProfile.setEventListener();

//↑ Инициализация экземпляра класса popupWithForm для попапа с данными о пользователе.

const popupAddAvatar = new PopupWithForm(
  ".popup-edit-avatar",
  (userData, buttonElem) => {
    popupAddAvatar.setElemStatus(buttonElem, "Сохранение...");
    api
      .addUserAvatar({
        avatarLink: userData.avatarLink,
      })
      .then((data) => {
        user.setUserAvatar({
          avatarLink: data.avatar,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((res) => {
        popupAddAvatar.setElemStatus(buttonElem, "Сохранить");
        popupAddAvatar.close();
      });
  }
);
popupAddAvatar.setEventListener();

//↑ Инициализация экземпляра класса PopupWithForm для попапа с обновлением аватара.

addButton.addEventListener("click", () => {
  popupAddCard.clearInputValues();
  popupAddCard.open();
  formAddPopupInstance.enableValidation();
});

//↑ Обработчик события, который открывает попап с добавлением карточки и включает проверку валидации для полей формы

editButton.addEventListener("click", () => {
  popupEditProfile.setUserData(user.getUserData());
  formEditPopupInstance.enableValidation();
  popupEditProfile.open();
});

//↑ Обработчик события, который открывает попап с данными о пользователе и включает проверку валидации для полей формы

addAvatarButton.addEventListener("click", () => {
  popupAddAvatar.setUserAvatar(user.getUserData());
  formAddAvatarInstance.enableValidation();
  popupAddAvatar.open();
});

//↑ Обработчик события, который открывает попап с обновлением аватарки и включает проверку валидации для полей формы. 
