import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { initialCards } from "../components/initialCards.js";
export { modalImage, addWindowEventListener };

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

//Выбор попапов
const popups = Array.from(document.querySelectorAll(".popup"));
const popupEditProfile = document.querySelector(".popup-edit-profile");
const popupAddPlace = document.querySelector(".popup-add-place");
const modalImage = document.querySelector(".popup-full-image");

//Выбор форм
const forms = Array.from(document.querySelectorAll(".popup__form"));
const formEditProfile = popupEditProfile.querySelector(".popup__form");

//Выбор профиля и его полей
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__title");
const profileJob = profile.querySelector(".profile__subtitle");

//Выбор списка с карточками
const photoList = document.querySelector(".photo-grid__list");

/* Функция, которая открывает и закрывает модалки. В качестве аргументов принимает
— элемент, над которым производим действие;
— класс, который ему нужно присвоить или убрать */
function togglePopup(item, itemClass) {
  item.classList.toggle(itemClass);
  window.removeEventListener("keydown", closeWindow);
}

/* Функция, которая добавляет карточки на страницу. В качестве аргументов принимает: 
  — элемент, в который добавляем карточку
  — место добавления относительно существующего контента
  — элемент, который добавляем в карточку */

function addCard(parentElem, place, childElem) {
  if (place === "append") {
    parentElem.append(childElem);
  } else if (place === "prepend") {
    parentElem.prepend(childElem);
  }
}

/*
//Функция, которая преобразует элементы массива в карточки
function initializeCards(initialCards) {
  initialCards.forEach((elem) => {
    const card = new Card(
      elem.name,
      elem.link,
      "#card-template"
    ).generateCard();
    addCard(photoList, "append", card);
  });
}
*/

const cardList = new Section({
  items: initialCards,
  renderer: (elem) => {
    const card = new Card(elem.name, elem.link, "#card-template").generateCard();

    cardList.addItem(card);
  }
}, photoList);

cardList.renderItems();

//Функция, которая заполняет содержимое полей модального окна с редактированием информации при загрузке страницы
function fillInputs(form, profileName, profileJob) {
  form.name.value = profileName.textContent;
  form.about.value = profileJob.textContent;
}

// Функция, устанавливающая обработчики событий для кнопок профиля
function setProfileListeners(profile, popupEditProfile, popupAddPlace) {
  profile.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("profile__edit-button")) {
      togglePopup(popupEditProfile, "popup_opened");
      addWindowEventListener();
    } else if (evt.target.classList.contains("profile__add-button")) {
      togglePopup(popupAddPlace, "popup_opened");
      addWindowEventListener();
    }
  });
}

//Функция, сохраняющая имя и описание пользователя
function saveProfileData(form, profileName, profileJob) {
  profileName.textContent = form.name.value;
  profileJob.textContent = form.about.value;
}

//Функция, сохраняющая новую карточку
function saveNewCard(form) {
  const formName = form.place.value;
  const formLink = form.link.value;

  const card = new Card(formName, formLink, "#card-template").generateCard();
  addCard(photoList, "prepend", card);
}

//Функция, устанавливающая валидацию и обработчики событий для кнопок форм
function setFormsListeners(
  forms,
  settings,
  popupEditProfile,
  popupAddPlace,
  profileName,
  profileJob
) {
  forms.forEach((form) => {
    const validatedForm = new FormValidator(settings, form);
    validatedForm.enableValidation();

    form.addEventListener("submit", function (evt) {
      evt.preventDefault();

      const evtSubmitter = evt.submitter;

      if (evtSubmitter.name === "save-button") {
        saveProfileData(form, profileName, profileJob);
        togglePopup(popupEditProfile, "popup_opened");
      } else if (evtSubmitter.name === "create-button") {
        saveNewCard(form);
        form.reset();
        evtSubmitter.classList.add("popup__button_inactive");
        evtSubmitter.setAttribute("disabled", "true");
        togglePopup(popupAddPlace, "popup_opened");
      }
    });
  });
}

//Функция, добавляющая обработчики событий для кнопок, закрывающих модальные окна
function setCloseButtonsListeners(popups) {
  popups.forEach((popupElement) => {
    popupElement.addEventListener("mousedown", function (evt) {
      if (
        evt.target.classList.contains("popup__close-button") ||
        evt.target.classList.contains("popup")
      ) {
        togglePopup(popupElement, "popup_opened");
      }
    });
  });
}

//Функция, устанавливающая обработчик события окну
function addWindowEventListener() {
  window.addEventListener("keydown", closeWindow);
}

//Функция, закрывающая модальное окно при нажатии клавиши Esc
function closeWindow(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape" && openedPopup != null) {
    togglePopup(openedPopup, "popup_opened");
  }
}

function preparePage() {
  //initializeCards(initialCards);
  fillInputs(formEditProfile, profileName, profileJob);
  setProfileListeners(profile, popupEditProfile, popupAddPlace);
  setFormsListeners(
    forms,
    settings,
    popupEditProfile,
    popupAddPlace,
    profileName,
    profileJob
  );
  setCloseButtonsListeners(popups);
}

preparePage();
