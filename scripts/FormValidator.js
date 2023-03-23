class FormValidator {
  constructor(data, validatorFormElement) {
  //принимаем на вход селекторы объекта валидации
  //this._formSelector = data.formSelector,//форма
  this._inputSelector = data.inputSelector,//инпут
  this._inputs = Array.from(this._validatorFormElement.querySelectorAll(this._inputSelector));//массив инпутов
  this._buttonSelector =this._validatorFormElement.querySelector('.save-button'),//кнопка сохранить
  this._disabledButtonSelecto = data.disabledButtonSelector,//неактивная кнопка
  this._inputErrorSelector = data.inputErrorSelector,//невалидность инпута
  this._spanErrorSelector = data.spanErrorSelector,//активная строка ошибки
  this._validatorFormElement = validatorFormElement//получаемая форма
}

//показаем ошибку (добавляем класс)
_showInputError (inputElement) {
  const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);//поиск через id элемента
  inputElement.classList.add(this._inputError);//добавили красное подчеркивание
  errorElement.textContent = inputElement.validationMessage;//текст ошибки - стандартная валидация
  errorElement.classList.add(this._spanErrorSelector);//показываем ошибку
};
//скрываем ошибку (удаляем класс)
_hideInputError (inputElement) {
  const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._inputError);//убираем подчеркивание
  errorElement.classList.remove(this._spanErrorSelector);//скрываем блок с ошибкой
  errorElement.textContent = '';
};

// Проверяем валидность полей
_checkInputValidity (inputElement) {
  if (!inputElement.validity.valid) {
    // Поле не проходит валидацию - показываем ошибку
    _showInputError(inputElement);
  } else {
    // Поле проходит валидацию - скрываем ошибку
    _hideInputError(inputElement);
  }
};
//валидация полей ввода
_setEventListeners () {
  //this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));//все инпуты в массив
  //const buttonElement = this._formSelector.querySelector(this._buttonSelector);
  _toggleButtonState();
  this._inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      _checkInputValidity(inputElement);
      _toggleButtonState();
    });
  });
};
//блокируем/разблокируем кнопку Сохранить/Создать после проверки на валидность инпутов
_toggleButtonState () {
  if(_hasInvalidInput(inputList)) {
   _disabledButton ();
  } else {
    _deleteDisabledButton ();
}
}
//проверяем поля на валидность
_hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
   return !inputElement.validity.valid;
 });
}
//копка не работает
_disabledButton () {
  this._buttonSelector.disabled = 'true';
  this._buttonSelector.classList.add(this._disabledButtonSelector);
}
//кнопка работает
_deleteDisabledButton () {
  this._buttonSelector.disabled = '';
  this._buttonSelector.classList.remove(this._disabledButtonSelector);
}
//очищаем форму от ошибок
_removeValidationErrors () {
  const inputElements = this._formSelector.querySelectorAll(this._inputSelector);
  inputElements.forEach(() => {
    _hideInputError();
    });
  };
}

  //запускаем валидацию форм
enableValidation () {
/*
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  */
    _setEventListeners();
}

//формы попапов
const formEditProfile = editForm.querySelector('.edit-form-profile');//форма редактирования профиля
const formAddCard = formAddCardPopup.querySelector('.edit-form-add-card');//форма создания карточки

//валидация формы редактирования профиля
const validatorEditProfile = new Card(selectors, formEditProfile);
validatorEditProfile.enableValidation();
//валидация формы создания карточки
const validatorformAddCard = new Card(selectors, formAddCard);
validatorEditProfile.enableValidation();
