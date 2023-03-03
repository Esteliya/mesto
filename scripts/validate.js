//alert('привет мир!');
//РАБОТАЕТ!
/*

novalidate - атрибут формы в html

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
*/

const formElement = document.querySelector('.edit-form');//форма
const formInput = formElement.querySelector('.edit-form__personalia');
// Выбираем элемент ошибки на основе уникального класса
const formError = formElement.querySelector(`.${formInput.id}-error`);


//показаем ошибку (добавляем класс)
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('edit-form__personalia-error_active');
};
//скрываем ошибку (удаляем класс)
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('edit-form__personalia-error_active');
  errorElement.textContent = '';
};

// Проверяем валидность полей
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Поле не проходит валидацию - показываем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Поле проходит валидацию - скрываем ошибку
    hideInputError(formElement, inputElement);
  }
};

//валидация полей ввода
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.edit-form__personalia'));
  const buttonElement = formElement.querySelector('.save-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//запускаем валидацию форм
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.edit-form'));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
    setEventListeners(formElement);
});
};

//проверяем поля на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
   return !inputElement.validity.valid;
 });
}
//блокируем кнопку Сохранить/Создать
const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)) {
   buttonElement.classList.add('save-button-disabled');
  } else {
    buttonElement.classList.remove('save-button-disabled');
}
}
enableValidation();
