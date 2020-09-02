import volgograd from '../images/photo-grid/volgograd.jpg';
import chelyabinsk from '../images/photo-grid/chelyabinsk.jpg';
import karelia from '../images/photo-grid/karelia.jpg';
import saintPetersburg from '../images/photo-grid/saint-p.jpg';
import sochi from '../images/photo-grid/sochi.jpg';
import murmansk from '../images/photo-grid/murmansk.jpg';


const initialCards = [
    {
      name: "Волгоград",
      link: volgograd,
    },
    {
      name: "Челябинск",
      link: chelyabinsk,
    },
    {
      name: "Карелия",
      link: karelia,
    },
    {
      name: "Санкт-Петербург",
      link: saintPetersburg,
    },
    {
      name: "Сочи",
      link: sochi,
    },
    {
      name: "Мурманск",
      link: murmansk,
    },
  ];

  const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
  };
  
  const forms = Array.from(document.querySelectorAll(".popup__form"));
  const formEditPopup = forms[0];
  const formAddPopup = forms[1];
  const photoList = document.querySelector(".photo-grid__list");
  const addButton = document.querySelector(".profile__add-button");
  const editButton = document.querySelector(".profile__edit-button");

  export { initialCards, settings, formEditPopup, formAddPopup, photoList, addButton, editButton }