//ИМПОРТ
import { handlerOpeningPopapImageZoom } from "./index.js";

//КЛАССЫ и ООП
class Card {
  constructor(data, templateSelector) {
    this._name = data.name;//имя
    this._link = data.link;//картинка
    this._templateSelector = templateSelector;//темплит
  }

  _getTemplate() {
    const cardElement = document//создали элемент
      .querySelector(this._templateSelector)//нашли темплит-элемент
      .content//извлекаем его содержимое
      .querySelector('.card')//в содержимом нашли элемент с классом card
      .cloneNode(true);//клонирование

    return cardElement;//возвращаем клонированный элемент
  }

  generateCard() {//вставляем данные из массива
    this._element = this._getTemplate();
    this._like = this._element.querySelector('.button-like');
    this._image = this._element.querySelector('.card__image');
    this._setEventListeners();

    this._image.style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }

  //обработчик слушателей
  _setEventListeners() {
    //слушатель кнопки лайка
    this._like.addEventListener('click', () => {
      this._handleLikeButton();
    });
    //слушатель кнопки удаления
    this._element.querySelector('.button-remove').addEventListener('click', () => {
      this._handleDeleteButton();
    });
    //слушаетль карточки - увеличение картинки
    this._image.addEventListener('click', () => {
      handlerOpeningPopapImageZoom(this._name, this._link);
    });
  }
   //кнопка лайка в карточке
   _handleLikeButton() {
    this._like.classList.toggle('button-like_activ');
  }
  //удаление карточки
  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

}

//ЭКСПОРТ
export { Card };
