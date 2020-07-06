let content = document.querySelector(".page");
let popupWindow = document.querySelector(".popup");

/* Выбор кнопок */
let editButton = content.querySelector(".profile__button_type_edit");
let cancelButton = popupWindow.querySelector(".popup__button_type_close");

/* Выбор формы и её полей */ 
let formElement = popupWindow.querySelector(".popup__form");
let popupName = popupWindow.querySelector(".popup__input_type_name");
let popupJob = popupWindow.querySelector(".popup__input_type_about");

/* Выбор имени пользователя и его рода деятельности */
let profileName = content.querySelector(".profile__title");
let profileJob = content.querySelector(".profile__subtitle");

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


editButton.addEventListener("click", makeVisible);
cancelButton.addEventListener("click", makeVisible);
formElement.addEventListener("submit", formSubmitHandler);
