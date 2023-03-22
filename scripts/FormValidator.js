class FormValidator {
    constructor(popupSelector) {
      this.popupSelector = popupSelector;//попап
      this.form = form;//форма
      this.button = button;///кнопка
      //this._input = input;//инпут
      //this._span = span;//строка ошибки
      //console.log(data);
    }
    _getForm() {
      const popupElement = document//создали элемент
        .querySelector(this._popupSelector)//нашли попап
        .content//извлекаем содержимое
        .querySelector('.edit-form')//в содержимом нашли форму

      return popupElement;//возвращаем элемент
    }
    setValidForm() {//проверяем валидность
      this._form = this._getForm();
      //this.enableValidation();
      this._inputs = Array.from(this._form.querySelectorAll('.edit-form__personalia'));
      this.button = this._form.querySelector('.save-button');


      return this._form;
    }

    enableValidation(){
      this._inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
          console.log('функция работает')
          //checkInputValidity(selectors, formElement, inputElement);
          //toggleButtonState(inputList, buttonElement);
        });
      });
    }

  }

  const validProfile = new FormValidator('.profile-popup');//валидация попапа профиля

/*
    _getFormValidator() {
      const formValidator = document//создали элемент
        .querySelector(this._formSelector)//нашли форму
        .content//извлекаем его содержимое
        .querySelector('.edit-form__personali')//в содержимом нашли input
        //.querySelector(`.${this._input}-error`)
        .cloneNode(true);//клонирование

      return formValidator;//возвращаем клонированный элемент
    }

    hasInvalidInput (this._input) {
      return this._input.some((inputElement) => {
       return !inputElement.validity.valid;
     });
    }
*/
/*
form - edit-form
imput - edit-form__personalia
span - ошибка - edit-form__personalia-error
кнопка - save-button

const selectors = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__personalia',
  buttonSelector: '.save-button',
  disabledButtonSelector: 'save-button-disabled',
  inputErrorSelector: 'input-error',
  spanErrorSelector: 'edit-form__personalia-error_active',
  }
*/
