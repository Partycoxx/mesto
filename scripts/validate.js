//Объект с настройками

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

//Функция, которая вешает обработчики событий на формы

function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    createEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
}

//Функция, которая вешает обработчики событий на инпуты 

function createEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputs, buttonElement, inactiveButtonClass);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(inputElement, formElement, inputErrorClass, errorClass);
      toggleButtonState(inputs, buttonElement, inactiveButtonClass);
    });
  });
}

//Функция, которая проверяет валидность данных в инпуте

function isValid(inputElement, formElement, inputErrorClass, errorClass) {
  if (!inputElement.validity.valid) {
    showErrorMessage(inputElement, formElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideErrorMessage(inputElement, formElement, inputErrorClass, errorClass);
  }
}

//Функция, которая сообщает о некорректных данных в инпуте

function showErrorMessage(inputElement, formElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

//Функция, которая прячет сообщение о некорректных данных в инпуте

function hideErrorMessage(inputElement, formElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
}

//Функция, которая проверяет валидность данных во всех инпутах
function hasInvalidInput(inputs) {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//Функция, которая выключает кнопки при невалидных данных
function toggleButtonState(inputs, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputs)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", "true");
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "false");
  }
}

enableValidation(settings);
