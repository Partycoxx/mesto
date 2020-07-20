const content = document.querySelector(".page");
const popupWindows = document.querySelectorAll(".popup");

/* Выбор списка с фото */

const photoList = content.querySelector(".photo-grid__list");
const cardTemplate = document.querySelector("#card-template").content;

/* Выбор кнопок */
const editButton = content.querySelector(".profile__edit-button");
const addButton = content.querySelector(".profile__add-button");
const cancelButtons = document.querySelectorAll(".popup__close-button");

/* Выбор формы и её полей для модального окна с редактированием профиля */

const modalEditProfile = popupWindows[0];
const formEditProfile = modalEditProfile.querySelector(".popup__form");
const popupName = modalEditProfile.querySelector(".popup__input_type_name");
const popupJob = modalEditProfile.querySelector(".popup__input_type_about");

/* Выбор имени пользователя и его рода деятельности */
let profileName = content.querySelector(".profile__title");
let profileJob = content.querySelector(".profile__subtitle");

/* Выбор формы и её полей для модального окна с добавлением картиочки */
const modalAddPlace = popupWindows[1];
const formAddPlace = modalAddPlace.querySelector(".popup__form");
const popupPlace = modalAddPlace.querySelector(".popup__input_type_place");
const popupLink = modalAddPlace.querySelector(".popup__input_type_link");

/* Выбор модального окна с изображением и его атрибутов */
const modalImage = popupWindows[2];
const image = modalImage.querySelector(".popup__image");
let caption = modalImage.querySelector(".popup__capture");

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

/* Функция, которая загружает карточки при загрузке страницы */

function loadCards() {
  initialCards.map((elem) => {
    let newItem = cardTemplate.cloneNode(true);

    newItem.querySelector(".card__image").src = elem.link;
    newItem.querySelector(".card__image").alt = `На фото: ${elem.name}`;
    newItem.querySelector(".card__heading").textContent = elem.name;

    generateEventListeners(newItem);

    photoList.append(newItem);
  });
}

loadCards();

/* Функция, которая добавляет карточкам обработчики событий */
function generateEventListeners(arg) {

  /* На открытие фото в полном разрешении */
  arg.querySelector(".card__image").addEventListener("click", function (evt) {
   const eventTarget = evt.target;
   image.src = eventTarget.src;
   image.alt = eventTarget.alt;
   caption.textContent = eventTarget.nextElementSibling.firstElementChild.textContent;
   openClose(modalImage, "popup_opened");
  }) 

  /* На удаление фото*/
  arg.querySelector(".card__button-trash").addEventListener("click", function (evt) {
    evt.target.closest(".card").remove();
  });

  /* На лайк фото */
  arg.querySelector(".card__button").addEventListener("click", function (evt) {
    const eventTarget = evt.target;
    openClose(eventTarget, "card__button_type_liked");
  });

}

/* Функция, которая открывает и закрывает модалки. */
/* В качестве аргументов принимает элемент и класс, который ему нужно присвоить/убрать */
function openClose(item, itemClass) {
  item.classList.toggle(itemClass);
}

/* Функция, которая открывает и заполняет модальное окно c редактированием профиля */
function openFirstPopup() {
  openClose(modalEditProfile, "popup_opened");
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
}

/* Функция, которая открывает модальное окно с добавлением снимков */
function openSecondPopup() {
  openClose(modalAddPlace, "popup_opened");
}

/* Функция, которая сохраняет введённые пользователем данные в модальном окне c редактированием профиля */
function editSubmitHandler(evt) {
  evt.preventDefault();

  let editedName = popupName.value;
  let editedJob = popupJob.value;

  profileName.textContent = editedName;
  profileJob.textContent = editedJob;

  openClose(modalEditProfile, "popup_opened");
}

/* Функция, которая сохраняет введённые пользователем данные в модальном окне с добавлением фото */
function addSubmitHandler(evt) {
  evt.preventDefault();

  let newPlace = cardTemplate.cloneNode(true);
  newPlace.querySelector(".card__image").src = popupLink.value;
  newPlace.querySelector(".card__heading").textContent = popupPlace.value;

  generateEventListeners(newPlace);

  photoList.prepend(newPlace);

  popupLink.value = "";
  popupPlace.value = "";

  openClose(modalAddPlace, "popup_opened");
}

/* Обработчик события для кнопки редактирования */
editButton.addEventListener("click", openFirstPopup);

/* Обработчик события для сохранения модального окна с редактированием данных  */
formEditProfile.addEventListener("submit", editSubmitHandler);

/* Обработчик события для кнопки добавления снимков */
addButton.addEventListener("click", openSecondPopup);

/* Обработчик события для сохранения модального окна с добавлением снимков */
formAddPlace.addEventListener("submit", addSubmitHandler);

/* Обработчики событий для кнопок, закрывающих модальные окна */
cancelButtons.forEach((item) => {
  item.addEventListener("click", function (evt) {
    const eventTarget = evt.target;
    const popup = eventTarget.parentElement.parentElement;
    openClose(popup, "popup_opened");
  });
});
