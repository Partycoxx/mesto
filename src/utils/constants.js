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

  const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
  };
  
  const forms = Array.from(document.querySelectorAll(".popup__form"));
  const photoList = document.querySelector(".photo-grid__list");
  const addButton = document.querySelector(".profile__add-button");
  const editButton = document.querySelector(".profile__edit-button");

  export { initialCards, settings, forms, photoList, addButton, editButton }