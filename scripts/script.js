const content = document.querySelector(".page");
const popupWindows = document.querySelectorAll(".popup");

/* Выбор списка с фото */

const photoList = content.querySelector(".photo-grid__list");
const cardTemplate = document.querySelector("#card-template").content;

/* Выбор кнопок */
const editButton = content.querySelector(".profile__edit-button");
const addButton = content.querySelector(".profile__add-button");
const cancelButtons = document.querySelectorAll(".popup__close-button");

/* Выбор первой формы и её полей */

const firstPopup = popupWindows[0];
const formEditProfile = firstPopup.querySelector(".popup__form");
const popupName = firstPopup.querySelector(".popup__input_type_name");
const popupJob = firstPopup.querySelector(".popup__input_type_about");

/* Выбор второй формы и её полей */
const secondPopup = popupWindows[1];
const formAddPlace = secondPopup.querySelector(".popup__form");
const popupPlace = secondPopup.querySelector(".popup__input_type_place");
const popupLink = secondPopup.querySelector(".popup__input_type_link");

/* Выбор имени пользователя и его рода деятельности */
let profileName = content.querySelector(".profile__title");
let profileJob = content.querySelector(".profile__subtitle");

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

    photoList.append(newItem);
  });
}

loadCards();

/* Функция, которая добавляет обработчики событий */
function generateEventListeners() {
  /* Переменные, в которых хранятся элементы карточек  */

  const likeButtons = photoList.querySelectorAll(".card__button");
  const removeButtons = photoList.querySelectorAll(".card__button-trash");

  /* Навешиваем обработчики событий на книпки с лайками  */

  likeButtons.forEach((item) => {
    item.addEventListener("click", function (evt) {
      const eventTarget = evt.target;
      openClose(eventTarget, "card__button_type_liked");
    });
  });

  /* Навешиваем обработчики событий для кнопок удаления карточек */
  removeButtons.forEach((item) => {
    item.addEventListener("click", function (evt) {
      const eventTarget = evt.target;
      const cardToRemove = eventTarget.closest(".card");
      cardToRemove.remove();
    });
  });
}

generateEventListeners();

/* Функция, которая открывает и закрывает модалки. */
/* В качестве аргументов принимает элемент и класс, который ему нужно присвоить/убрать */
function openClose(item, itemClass) {
  item.classList.contains(itemClass)
    ? item.classList.remove(itemClass)
    : item.classList.add(itemClass);
}

/* Функция, которая открывает и заполняет модальное окно c редактированием профиля */

function openFirstPopup() {
  openClose(firstPopup, "popup_opened");
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
}

/* Функция, которая открывает модальное окно с добавлением снимков */
function openSecondPopup() {
  openClose(secondPopup, "popup_opened");
}

/* Функция, которая сохраняет введённые пользователем данные в модальном окне c редактированием профиля */

function editSubmitHandler(evt) {
  evt.preventDefault();

  let editedName = popupName.value;
  let editedJob = popupJob.value;

  profileName.textContent = editedName;
  profileJob.textContent = editedJob;

  openClose(firstPopup, "popup_opened");
}

/* Функция, которая сохраняет введённые пользователем данные в модальном окне с добавлением фото */

function addSubmitHandler(evt) {
  evt.preventDefault();

  let newPlace = cardTemplate.cloneNode(true);
  newPlace.querySelector(".card__image").src = popupLink.value;
  newPlace.querySelector(".card__heading").textContent = popupPlace.value;

  photoList.prepend(newPlace);

  popupLink.value = "";
  popupPlace.value = "";

  generateEventListeners();

  openClose(secondPopup, "popup_opened");
}

/* Поле экспериментов*/

/* Конец поля для экспериментов*/

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
