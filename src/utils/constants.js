
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
  const formAddAvatar = forms[3];
  const photoList = document.querySelector(".photo-grid__list");
  const addButton = document.querySelector(".profile__add-button");
  const editButton = document.querySelector(".profile__edit-button");
  const addAvatarButton = document.querySelector(".profile__pic-overlay");
  const ownerId = "45faaa516c30c0394fec0452";

  export {settings, formEditPopup, formAddPopup, formAddAvatar, photoList, addButton, editButton, addAvatarButton, ownerId }