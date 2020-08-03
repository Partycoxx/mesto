// Переменная, в которой храним массивы с названиями городов и ссылками на фото*/
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

//Выбор попапов
const popups = Array.from(document.querySelectorAll(".popup"));
const popupEditProfile = document.querySelector(".popup-edit-profile");
const popupAddPlace = document.querySelector(".popup-add-place");
const modalImage = document.querySelector(".popup-full-image");

//Выбор форм
const forms = Array.from(document.querySelectorAll('.popup__form'));
const formEditProfile = popupEditProfile.querySelector(".popup__form");

//Выбор профиля и его полей
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__title");
const profileJob = profile.querySelector(".profile__subtitle");

//Выбор списка с карточками
const photoList = document.querySelector(".photo-grid__list");
const cardTemplate = document.querySelector("#card-template").content;

/* Функция, которая открывает и закрывает модалки. В качестве аргументов принимает
— элемент, над которым производим действие;
— класс, который ему нужно присвоить или убрать */
function togglePopup(item, itemClass) {
  item.classList.toggle(itemClass);
}

// Функция, устанавливюащая карточкам обработчики событий. 
function setCardListeners(card) {
  card.querySelector(".card").addEventListener("click", function(evt) {
    const eventTarget = evt.target;

    // На открытие фото в полном разрешении
    if (eventTarget.classList.contains("card__image")) {
      const image = modalImage.querySelector(".popup__image");
      const caption = modalImage.querySelector(".popup__capture");

      image.src = eventTarget.src;
      image.alt = eventTarget.alt;
      caption.textContent = eventTarget.nextElementSibling.firstElementChild.textContent;
      togglePopup(modalImage, "popup_opened");
      addWindowEventListener();
    } 
    
    // На удаление фото
    else if (eventTarget.classList.contains("card__button-trash")) {
      eventTarget.closest(".card").remove();
    }

    // На лайк фото 
    else if (eventTarget.classList.contains("card__button")) {
      togglePopup(eventTarget, "card__button_type_liked");
    }
  })
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

// Функция, которая создаёт карточки
function createCards(initialCards) {
  initialCards.map((elem) => {
    const newItem = cardTemplate.cloneNode(true);

    newItem.querySelector(".card__image").src = elem.link;
    newItem.querySelector(".card__image").alt = `На фото: ${elem.name}`;
    newItem.querySelector(".card__heading").textContent = elem.name;

    setCardListeners(newItem);
    addCard(photoList, "append", newItem);
  });
}

//Функция, которая заполняет содержимое полей модального окна с редактированием информации при загрузке страницы
function fillInputs(form, profileName, profileJob) {
  form.name.value = profileName.textContent;
  form.about.value = profileJob.textContent;
}

// Функция, устанавливающая обработчики событий для кнопок профиля
function setProfileListeners(profile, popupEditProfile, popupAddPlace) {

  profile.addEventListener("click", function(evt) {
    if (evt.target.classList.contains("profile__edit-button")) {
      togglePopup(popupEditProfile, "popup_opened");
      addWindowEventListener();
    } 
    else if (evt.target.classList.contains("profile__add-button")) {
      togglePopup(popupAddPlace, "popup_opened");
      addWindowEventListener();
    }
  })
  }

//Функция, сохраняющая имя и описание пользователя
function saveProfileData(form, profileName, profileJob) {
  profileName.textContent = form.name.value;
  profileJob.textContent = form.about.value;   
}

//Функция, сохраняющая новую карточку
function saveNewCard(form) {
  const newPlace = cardTemplate.cloneNode(true);
  newPlace.querySelector(".card__image").src = form.link.value;
  newPlace.querySelector(".card__heading").textContent = form.place.value;

  setCardListeners(newPlace);
  addCard(photoList, "prepend", newPlace);
  form.reset();
}

//Функция, устанавливающая обработчики событий для кнопок форм 
function setFormsListeners(forms, popupEditProfile, popupAddPlace, profileName, profileJob) {
  
  forms.forEach((form) => {
    form.addEventListener("submit", function(evt) {
      evt.preventDefault();

      if (evt.submitter.name === "save-button") {
        saveProfileData(form, profileName, profileJob);
        togglePopup(popupEditProfile, "popup_opened");
      } 
      else if (evt.submitter.name === "create-button") {
        saveNewCard(form);
        togglePopup(popupAddPlace, "popup_opened");
      }
  })
})
}

//Функция, добавляющая обработчики событий для кнопок, закрывающих модальные окна
function setCloseButtonsListeners(popups) {
  popups.forEach((popupElement) => {
    popupElement.addEventListener("mousedown", function (evt) {
      if (evt.target.classList.contains("popup__close-button") || evt.target.classList.contains("popup")) {
        togglePopup(popupElement, "popup_opened");
      }
    });
  });
}

//Функция, устанавливающая обработчик события окну
function addWindowEventListener() {
  window.addEventListener("keydown", closeWindow)
} 

//Функция, закрывающая модальное окно при нажатии клавиши Esc
function closeWindow(evt) { 
  const openedPopup = document.querySelector(".popup_opened");
    if (evt.key === "Escape" && openedPopup != null) {
      togglePopup(openedPopup, "popup_opened");
      window.removeEventListener("keydown", closeWindow);
    }
}

function preparePage() {
createCards(initialCards);
fillInputs(formEditProfile, profileName, profileJob);
setProfileListeners(profile, popupEditProfile, popupAddPlace);
setFormsListeners(forms, popupEditProfile, popupAddPlace, profileName, profileJob);
setCloseButtonsListeners(popups);
}

preparePage();