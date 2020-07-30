const content = document.querySelector(".page");


/* Выбор списка с фото */

const photoList = content.querySelector(".photo-grid__list");
const cardTemplate = document.querySelector("#card-template").content;

/* Выбор кнопок */
const editButton = content.querySelector(".profile__edit-button");
const addButton = content.querySelector(".profile__add-button");

/* Выбор формы и её полей для модального окна с редактированием профиля */

const popupEditProfile = document.querySelector(".popup-edit-profile");
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const popupName = popupEditProfile.querySelector(".popup__input_type_name");
const popupJob = popupEditProfile.querySelector(".popup__input_type_about");

/* Выбор имени пользователя и его рода деятельности */
const profileName = content.querySelector(".profile__title");
const profileJob = content.querySelector(".profile__subtitle");

/* Выбор формы и её полей для модального окна с добавлением карточки */
const popupAddPlace = document.querySelector(".popup-add-place");
const formAddPlace = popupAddPlace.querySelector(".popup__form");
const popupPlace = popupAddPlace.querySelector(".popup__input_type_place");
const popupLink = popupAddPlace.querySelector(".popup__input_type_link");

/* Выбор модального окна с изображением и его атрибутов */
const modalImage = document.querySelector(".popup-full-image");
const image = modalImage.querySelector(".popup__image");
const caption = modalImage.querySelector(".popup__capture");

/* Переменная, в которой храним массивы с названиями городов и ссылками на фото*/

const initialCards = [
  {
    name: "Волгоград",
    link: "./images/photo-grid/volgograd.jpg",
  },
  {
    name: "Челябинск",
    link: "./images/photo-grid/chelyabinsk.jpg",
  },
  {
    name: "Карелия",
    link: "./images/photo-grid/karelia.jpg",
  },
  {
    name: "Санкт-Петербург",
    link: "./images/photo-grid/saint-p.jpg",
  },
  {
    name: "Сочи",
    link: "./images/photo-grid/sochi.jpg",
  },
  {
    name: "Мурманск",
    link: "./images/photo-grid/murmansk.jpg",
  },
];

/* Функция, которая создаёт карточки */

function createCards() {
  initialCards.map((elem) => {
    const newItem = cardTemplate.cloneNode(true);

    newItem.querySelector(".card__image").src = elem.link;
    newItem.querySelector(".card__image").alt = `На фото: ${elem.name}`;
    newItem.querySelector(".card__heading").textContent = elem.name;

    setCardListeners(newItem);
    loadCards(newItem);
  });
}

/* Функция, которая загружает карточки на страницу */

function loadCards(arg) {
  photoList.append(arg);
}

createCards();

/* Функция, которая заполняет содержимое полей модального окна ← доработать */
function fillInputs() {
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
}

fillInputs();

/* Функция, которая добавляет карточкам обработчики событий */
function setCardListeners(arg) {
  /* На открытие фото в полном разрешении */
  arg.querySelector(".card__image").addEventListener("click", function (evt) {
    const eventTarget = evt.target;
    image.src = eventTarget.src;
    image.alt = eventTarget.alt;
    caption.textContent =
      eventTarget.nextElementSibling.firstElementChild.textContent;
    togglePopup(modalImage, "popup_opened");
  });

  /* На удаление фото*/
  arg
    .querySelector(".card__button-trash")
    .addEventListener("click", function (evt) {
      evt.target.closest(".card").remove();
    });

  /* На лайк фото */
  arg.querySelector(".card__button").addEventListener("click", function (evt) {
    const eventTarget = evt.target;
    togglePopup(eventTarget, "card__button_type_liked");
  });
}

/* Функция, которая открывает и закрывает модалки. */
/* В качестве аргументов принимает элемент и класс, который ему нужно присвоить/убрать */
function togglePopup(item, itemClass) {
  item.classList.toggle(itemClass);
 }

/* Функция, которая сохраняет введённые пользователем данные в модальном окне c редактированием профиля */
function saveProfileData(evt) {
  evt.preventDefault();

  const editedName = popupName.value;
  const editedJob = popupJob.value;

  profileName.textContent = editedName;
  profileJob.textContent = editedJob;

  togglePopup(popupEditProfile, "popup_opened");
}

/* Функция, которая сохраняет введённые пользователем данные в модальном окне с добавлением фото */
function saveNewCard(evt) {
  evt.preventDefault();

  const newPlace = cardTemplate.cloneNode(true);
  newPlace.querySelector(".card__image").src = popupLink.value;
  newPlace.querySelector(".card__heading").textContent = popupPlace.value;

  setCardListeners(newPlace);

  photoList.prepend(newPlace);

  popupLink.value = "";
  popupPlace.value = "";
// ↑ Это можно сделать через reset()
  togglePopup(popupAddPlace, "popup_opened");
}

/* Обработчик события для кнопки редактирования */
editButton.addEventListener("click", () => {
  togglePopup(popupEditProfile, "popup_opened");
});

/* Обработчик события для сохранения модального окна с редактированием данных  */
formEditProfile.addEventListener("submit", saveProfileData);

/* Обработчик события для кнопки добавления снимков */
addButton.addEventListener("click", () =>
  togglePopup(popupAddPlace, "popup_opened")
);

/* Обработчик события для сохранения модального окна с добавлением снимков */
formAddPlace.addEventListener("submit", saveNewCard);

/* Обработчики событий для кнопок, закрывающих модальные окна */


function closeModals() {
  const modals = document.querySelectorAll('.popup');

  modals.forEach((popupElement) => {
    popupElement.addEventListener("click", function (evt) {
      if (evt.target.classList.contains("popup__close-button") || evt.target.classList.contains("popup")) {
        togglePopup(popupElement, "popup_opened");
      } 
    });
    
  });
  window.addEventListener('keydown', function (evt) {
    const openedPopup = document.querySelector(".popup_opened");
     if (evt.key === 'Escape' && openedPopup != null) {
      togglePopup(openedPopup, "popup_opened");
    }
  })

}

closeModals();

/* Валидация форм */

function createValidation() {
  const forms = Array.from(document.querySelectorAll(".popup__form"));

  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    createEventListeners(formElement);
  });
}

function createEventListeners(formElement) {
  const inputs = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__save-button");

  toggleButtonState(inputs, buttonElement);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(inputElement, formElement);
      toggleButtonState(inputs, buttonElement);
    });
  });
}

function isValid(inputElement, formElement) {
  if (!inputElement.validity.valid) {
    showErrorMessage(inputElement, formElement, inputElement.validationMessage);
  } else {
    hideErrorMessage(inputElement, formElement);
  }
}

function showErrorMessage(inputElement, formElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
}

function hideErrorMessage(inputElement, formElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
}

function hasInvalidInput(inputs) {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputs, buttonElement) {
  if (hasInvalidInput(inputs)) {
    buttonElement.classList.add("popup__save-button_inactive");
    buttonElement.setAttribute("disabled", "true");
  } else {
    buttonElement.classList.remove("popup__save-button_inactive");
    buttonElement.removeAttribute("disabled", "false");
  }
}

createValidation();
