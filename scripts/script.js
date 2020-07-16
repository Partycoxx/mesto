const content = document.querySelector(".page");
const popupWindow = document.querySelector(".popup");

/* Выбор списка с фото */

const photoList = content.querySelector(".photo-grid__list");
const cardTemplate = document.querySelector("#card-template").content;


/* Выбор кнопок */
const editButton = content.querySelector(".profile__edit-button");
const cancelButton = popupWindow.querySelector(".popup__close-button");

/* Выбор формы и её полей */ 
let formElement = popupWindow.querySelector(".popup__form");
let popupName = popupWindow.querySelector(".popup__input_type_name");
let popupJob = popupWindow.querySelector(".popup__input_type_about");

/* Выбор имени пользователя и его рода деятельности */
let profileName = content.querySelector(".profile__title");
let profileJob = content.querySelector(".profile__subtitle");

/* Переменная, в которой храним массивы с названиями городов и ссылками на фото*/



/* Функция, которая проверяет, присвоен ли модальному окну модификатор opened. */

function makeVisible() {
    popupWindow.classList.contains("popup_opened")
      ? popupWindow.classList.remove("popup_opened")
      : popupWindow.classList.add("popup_opened");
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
  }

/* Функция, которая сохраняет введённые пользователем данные  */

function formSubmitHandler(evt) {
  evt.preventDefault();

  /* Присваиваем переменным значения input */
  let editedName = popupName.value; 
  let editedJob = popupJob.value;

  /* Вставляем значения переменных в качестве имени пользователя и рода деятельности в профиле */
  profileName.textContent = editedName;
  profileJob.textContent = editedJob;

  makeVisible(); /* Закрываем модалку */
}

/* Функция, которая загружает содержимое на страницу */

function loadCards () {

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

initialCards.map((elem) => {
  let newItem = cardTemplate.cloneNode(true);

  newItem.querySelector('.card__image').src = elem.link;
  newItem.querySelector('.card__image').alt = `На фото: ${elem.name}`;
  newItem.querySelector('.card__heading').textContent = elem.name;

  photoList.append(newItem)
})
 
}

loadCards();

editButton.addEventListener("click", makeVisible);
cancelButton.addEventListener("click", makeVisible);
formElement.addEventListener("submit", formSubmitHandler);



