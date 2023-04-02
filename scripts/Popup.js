export default class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;// селектор попапа
    //this._popupSelector = document.querySelector(popupSelector);
    this._closeButton = this._popupSelector.querySelector('.close-button');//кнопка закрытия
  }
  //открытие попапа
  open = (element) => {
    element.classList.add('popup_open');//добавили класс
  }
  //закрытие попапа
  close = (element) => {
    element.classList.remove('popup_open');//удалили класс
  }
  //закрываем по нажатию Esc
  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      clonsole.log('нажали Esc');
      this.close (this._popupSelector);
    }
  }
//закрываем по клику на оверлей
  _handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      clonsole.log('клик по оверлею');
      this.close (this._popupSelector);
  }

  //слушатель
  setEventListeners = () => {
    this._closeButton.addEventListener('click', this.close(this._popupSelector));//клик по кнопке Закрыть
    console.log(this._closeButton);
    this._popupSelector.addEventListener('click', this._handleOverlayClick);//клик по оверлею
    document.addEventListener('keydown', this._handleEscClose);//слушатель Esc
}
}
}
/*
//попап с zoom-картинкой
const PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    //this._image = image;
    //this._title = title;
    this._image = popupSelector.querySelector('.popap-photo');
    this._title = popupSelector.querySelector('.popap-photo-title');
  }
  open (name, link) {
    super.open ();
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = title;
    this._popupSelector.classList.add('.popup_open');//добавили класс
  };
}

*/
