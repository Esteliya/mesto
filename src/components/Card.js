class Card {
  constructor(data, templateSelector, handlerCardClick, handlerOpenConfirmationPopup, userId) {
    this._data = data;
    this._name = data.name;//имя
    this._link = data.link;//картинка
    this._id = data._id;//id карточки ???
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;//темплит
    this._handlerCardClick = handlerCardClick;//обработчик клика по карточке
    this._handlerOpenConfirmationPopup = handlerOpenConfirmationPopup;//обработчик открытия попапа водтверждения удаления
    this._userId = userId;
    //console.log('userId', userId);
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
    this._delete = this._element.querySelector('.button-remove');
    //console.log('this._delete', this._delete);
    this._setEventListeners();
    //this._requestId();

    this._image.style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.card__title').textContent = this._name;
    this._createDeleteButton ();

    return this._element;
  }

/*
  _requestId () {
    fetch('https://mesto.nomoreparties.co/v1/cohort-64/cards', {
    headers: {
      authorization: '524c1b7c-bb91-4dd5-95f2-6bf707a74ceb'
    }
  })
    .then(res => res.json())
    .then((result) => {
      //console.log('проверка связи');
      result.forEach((num) => {
        console.log('как получить id', num.name, num.owner._id);
        console.log(num.owner._id === 'eef2b9374335bd2cab413a6c');//ждем true
        if (num.owner._id === 'eef2b9374335bd2cab413a6c') {//если true, добавляем класс
          console.log('сравнили id', num.owner._id);
          this._delete.classList.add('button-remove_show');
          //this._element.querySelector('.button-remove').classList.add('button-remove_show');
        } else {
          this._delete.classList.remove('button-remove_show');
        }
      })


        if (data.owner._id === myId) {
          console.log('как получить id', num.owner._id);
          //this._element.querySelector('.button-remove').classList.add('button-remove_show');
        } console.log('все сломалось');

      })
  }
*/

  _zoomImageCard() {
    this._handlerCardClick(this._data);
  }

  //показываем кнопку удаления -> проверяем по id создателя
  _createDeleteButton () {
    if (this._userId === this._ownerId) {
      //console.log('userId',this._userId);
      //console.log('ownerId',this._ownerId);
      //debugger;
      //console.log(true);
      //this._createDeleteButton();
      this._delete.classList.add('button-remove_show');
    }
  }

  //обработчик слушателей
  _setEventListeners() {
    //слушатель кнопки лайка
    this._like.addEventListener('click', () => {
      this._handlerLikeButton();
    });

    /* //слушатель кнопки удаления
    this._element.querySelector('.button-remove').addEventListener('click', () => {
      this._handlerDeleteButton();
    }); */

    //слушаетль карточки - увеличение картинки
    this._image.addEventListener('click', () => {
      this._zoomImageCard();
    });
    //слушатель кнопки удаления
    this._delete.addEventListener('click', () => {
      //this._handlerClickDeleteButton();
      this._handlerOpenConfirmationPopup(this._id);
    });
  }
   //кнопка лайка в карточке
   _handlerLikeButton() {
    this._like.classList.toggle('button-like_activ');
  }
  //удаление карточки из разметки
  handlerDeleteButton() {
    this._element.remove();
    this._element = null;
  }
  /* //обработчик клика по кнопке удаления карточки (с сервера)
  _handlerClickDeleteButton () {
    this._handlerOpenConfirmationPopup(this._id);
  } */
  //отображение кнопки удаления
  _visualButtonDelete () {
    this._element.querySelector('.button-remove').classList.add('button-remove_show');


}
}

//ЭКСПОРТ
export { Card };
