class Card {
  constructor(
    data,
    templateSelector,
    handlerCardClick,
    handlerOpenConfirmationPopup,
    handleClickLike,
    userId
  ) {
    this._data = data;
    this._name = data.name;//имя
    this._link = data.link;//картинка
    this._id = data._id;//id карточки ???
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;//темплит
    this._handlerCardClick = handlerCardClick;//обработчик клика по карточке
    this._handlerOpenConfirmationPopup = handlerOpenConfirmationPopup;//обработчик открытия попапа водтверждения удаления
    this._handleClickLike = handleClickLike;//обработчик клика лайка
    this._userId = userId;
    this._myLike = false;
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
    this._counter = this._element.querySelector('.card__like-counter');
    this._arreyLike();

    this._setEventListeners();

    this._image.style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.card__title').textContent = this._name;
    this._visualButtonDelete();

    this._startPageLikes();

    return this._element;
  }
  //вписываем количество лайков с сервера +
  _arreyLike() {
    this._counter.textContent = this._likes.length;
  }

  //сверяем id
  checkMyLiked() {
    return this._likes.some(user => user._id === this._userId)
  }

  //увеличиваем изображение карточки
  _zoomImageCard() {
    this._handlerCardClick(this._data);
  }

  //показываем кнопку удаления -> проверяем по id создателя
  _visualButtonDelete() {
    if (this._userId === this._ownerId) {
      this._delete.classList.add('button-remove_show');
    }
  }

  updateLikes(res) {
    this._likes = res.likes;
    this._counter.textContent = res.likes.length;

    if (this.checkMyLiked()) {
      console.log('true');
    } else {
      console.log('false');
    }

    this._toggleLikeButton();
  }

  _startPageLikes() {
    //console.log('this.checkMyLiked() = ' + this.checkMyLiked());
    const check = this.checkMyLiked();

    if (check) {
      //console.log('Лайка ЕСТЬ —> удаляем лайк');
      this._like.classList.add('button-like_activ');
    } else {
      //console.log('Лайка НЕТ  —> ставим лайк');
    }
  }

  //кнопка лайка в карточке
  _toggleLikeButton() {
    this._like.classList.toggle('button-like_activ');
  }
  //удаление карточки из разметки
  handlerDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  //обработчик слушателей
  _setEventListeners() {
    //слушатель кнопки лайка
    this._like.addEventListener('click', () => {
      this._handleClickLike();
    });

    //слушаетль карточки - увеличение картинки
    this._image.addEventListener('click', () => {
      this._zoomImageCard(this._id, this._myLike);
    });

    //слушатель кнопки удаления
    this._delete.addEventListener('click', () => {
      this._handlerOpenConfirmationPopup(this._id);
    });
  }
}

//ЭКСПОРТ
export { Card };
