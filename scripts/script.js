const content = document.querySelector(".page");
const popupWindows = document.querySelectorAll(".popup");

/* Выбор списка с фото */

const photoList = content.querySelector(".photo-grid__list");
const cardTemplate = document.querySelector("#card-template").content;


/* Выбор кнопок */
const editButton = content.querySelector(".profile__edit-button");
const addButton = content.querySelector(".profile__add-button");
const cancelButton = document.querySelectorAll(".popup__close-button");


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
      name: 'Волгоград',
      link: './images/photo-grid/volgograd.jpg'
  },
  {
      name: 'Челябинск',
      link: './images/photo-grid/chelyabinsk.jpg'
  },
  {
      name: 'Карелия',
      link: './images/photo-grid/karelia.jpg'
  },
  {
      name: 'Санкт-Петербург',
      link: './images/photo-grid/saint-p.jpg'
  },
  {
      name: 'Сочи',
      link: './images/photo-grid/sochi.jpg'
  },
  {
      name: 'Мурманск',
      link: './images/photo-grid/murmansk.jpg'
  }
];

/* Функция, которая открывает и заполняет первое модальное окно */

function openFirstPopup() {
    makeVisible(firstPopup);
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
  }

/* Функция, которая открывает второе модальное окно */
function openSecondPopup() {
  makeVisible(secondPopup);
}

/* Функция, которая сохраняет введённые пользователем данные  */

function editSubmitHandler(evt) {
  evt.preventDefault();

  /* Присваиваем переменным значения input */
  let editedName = popupName.value; 
  let editedJob = popupJob.value;

  /* Вставляем значения переменных в качестве имени пользователя и рода деятельности в профиле */
  profileName.textContent = editedName;
  profileJob.textContent = editedJob;

  makeVisible(firstPopup); /* Закрываем модалку */
}

/* Функция, которая загружает содержимое на страницу */

function loadCards () {

initialCards.map((elem) => {
  let newItem = cardTemplate.cloneNode(true);

  newItem.querySelector('.card__image').src = elem.link;
  newItem.querySelector('.card__image').alt = `На фото: ${elem.name}`;
  newItem.querySelector('.card__heading').textContent = elem.name;

  photoList.append(newItem)
})
 
}

/* Функция, которая открывает и закрывает модалки */
function makeVisible(arg) {
    arg.classList.contains("popup_opened")
    ? arg.classList.remove("popup_opened")
    : arg.classList.add("popup_opened");
  }

/* Поле экспериментов*/

function addSubmitHandler(evt) {
  evt.preventDefault();

   let newPlace = cardTemplate.cloneNode(true);
  newPlace.querySelector('.card__image').src = popupLink.value;
  newPlace.querySelector('.card__heading').textContent = popupPlace.value;

  photoList.prepend(newPlace);

  popupLink.value = '';
  popupPlace.value = '';

  makeVisible(secondPopup);
}

loadCards();

editButton.addEventListener("click", openFirstPopup);
addButton.addEventListener("click", openSecondPopup);
formEditProfile.addEventListener("submit", editSubmitHandler);
formAddPlace.addEventListener("submit", addSubmitHandler);

/* Обработчики событий для кнопок, закрывающих модалки */
cancelButton.forEach(item => {
  item.addEventListener("click", function (evt) {
    const eventTarget = evt.target;
    const popup = eventTarget.parentElement.parentElement;

    return makeVisible(popup)
  })
})
