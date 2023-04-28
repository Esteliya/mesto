//ИМПОРТ
import Popup from "./Popup.js";

export default class СonfirmationPopup extends Popup {
  constructor (popupSelector, handlerFormSubmit) {//ждем обработчиик извне
    super(popupSelector);//родителя
    this._form = this._popup.querySelector('.edit-form');//форма попапа
    this._button = this._form.querySelector('.popup__save-button');//кнопка сохранить
    this._handlerFormSubmit = handlerFormSubmit;
  }

  //открываем попап
  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }

  //неактивная кнопка
  disableButton(text, disable = true) {
    this._button.disable = disable;
    this._button.textContent = text;
  }

  //слушатели
  setEventListeners () {
    super.setEventListeners ();//родителя
    //слушатель события формы
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handlerFormSubmit(this._cardId, this._card);//+
    });
}
}
