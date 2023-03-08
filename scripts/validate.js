//показаем ошибку (добавляем класс)
const showInputError = (selectors, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);//поиск через id элемента
  inputElement.classList.add(selectors.inputErrorSelector);//добавили красное подчеркивание
  errorElement.textContent = inputElement.validationMessage;//текст ошибки - стандартная валидация
  errorElement.classList.add(selectors.spanErrorSelector);//показываем ошибку
};
//скрываем ошибку (удаляем класс)
const hideInputError = (selectors, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorSelector);//убираем подчеркивание
  errorElement.classList.remove(selectors.spanErrorSelector);//скрываем блок с ошибкой
  errorElement.textContent = '';
};

// Проверяем валидность полей
const checkInputValidity = (selectors,formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Поле не проходит валидацию - показываем ошибку
    showInputError(selectors, formElement, inputElement);
  } else {
    // Поле проходит валидацию - скрываем ошибку
    hideInputError(selectors, formElement, inputElement);
  }
};

//валидация полей ввода
const setEventListeners = (selectors, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));//все инпуты в массив
  const buttonElement = formElement.querySelector(selectors.buttonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(selectors, formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//запускаем валидацию форм
const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
    setEventListeners(selectors, formElement);
});
};

//проверяем поля на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
   return !inputElement.validity.valid;
 });
}
//блокируем/разблокируем кнопку Сохранить/Создать после проверки на валидность инпутов
const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)) {
   disabledButton (selectors, buttonElement);
  } else {
    deleteDisabledButton (selectors, buttonElement);
}
}
//копка не работает
const disabledButton = (selectors, buttonElement) => {
  buttonElement.disabled = 'true';
  buttonElement.classList.add(selectors.disabledButtonSelector);
}
//кнопка работает
const deleteDisabledButton = (selectors, buttonElement) => {
  buttonElement.disabled = '';
  buttonElement.classList.remove(selectors.disabledButtonSelector);
}

//очищаем форму от ошибок
const removeValidationErrors = (selectors, formElement) => {
  inputElements = formElement.querySelectorAll(selectors.inputSelector);
  inputElements.forEach((inputElement) => {
    hideInputError(selectors, formElement, inputElement);
    enableValidation (selectors);
    });
  };

//enableValidation(selectors);
