let content = document.querySelector('.page');
let popupWindow = document.querySelector('.popup');

let editButton = content.querySelector('.button_type_edit');
let cancelButton = popupWindow.querySelector('.button_type_close');

let formElement = popupWindow.querySelector('.popup__form');
let popupName = popupWindow.querySelector('.popup__input_type_name');
let popupJob = popupWindow.querySelector('.popup__input_type_about');

let profileName = content.querySelector('.profile__title');
let profileJob = content.querySelector('.profile__subtitle');


function showPopup() {
    popupWindow.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
}

function closePopup() {
    popupWindow.classList.remove('popup_opened')
} 

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    let editedName = popupName.value;
    let editedJob = popupJob.value;

    profileName.textContent = editedName;
    profileJob.textContent = editedJob;

    closePopup();
}

editButton.addEventListener('click', showPopup);
cancelButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);