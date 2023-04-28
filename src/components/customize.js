//КНОПКИ
const editButton = document.querySelector('.edit-button');//кнопка редактирования профиля
const addButton = document.querySelector('.add-button');//кнопка добавления карточки

//СЕКЦИИ И БЛОКИ НА СТРАНИЦЕ
//профиль на странице
const cards = document.querySelector('.cards')//блок с карточками
const avatarImg = document.querySelector('.profile__avatar');//аватарка
//ПОПАПЫ
//попап редактирования профиля
const nameEdit = document.getElementById('firstname');//инпут имя профиля
const profEdit = document.getElementById('profession');//инпут профессия
const editForm = document.querySelector('.edit-form-profile');//форма заполнения попапа

//попап добавления карточки
const inputNameAddCardPopup = document.getElementById('name-card');//поле заполнения названия карточки
const inputLinkAddCardPopup = document.getElementById('images');//поле заполнения ссылки img
const formAddCardPopup = document.querySelector('.edit-form-add-card');//форма с инпутами

//попап редактирования аватарки
const editAvatar = document.querySelector('.edit-form-avatar');//форма заполнения попапа


const selectors = {
  formSelector: '.edit-form',//форма
  inputSelector: '.edit-form__personalia',//инпут в форме
  buttonSelector: '.popup__save-button',//кнопка сохранения
  disabledButtonSelector: 'save-button-disabled',//неактивная кнопка
  inputErrorSelector: 'input-error',//нижнее подчеркивание инпута
  spanErrorSelector: 'edit-form__personalia-error_active',//активная строка ошибки
  nameSelector: ".profile__user-firstname",//html-строка имени профиля
  aboutSelector: ".profile__user-profession",//html-строка профессии
  avatarSelector: ".profile__avatar",//html <img src=#>
  templiteSelector: "#templite-card",//блок для карточек
  popupProfile: ".profile-popup",//попап редактирования профиля
  popupAddCard: ".add-card-popup",//попап создания новой карточки
  popupZoom: ".zoom-img-popup",//попап zoom-картинки
  popupDelete: ".delete-card-popup",//попап подтверждения удаления
  popupAddAvatar: ".add-avatar-popup",//попап редактирования аватарки
};

//настройки api
const apiSetting = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '524c1b7c-bb91-4dd5-95f2-6bf707a74ceb',
    'Content-Type': 'application/json'
  },
};

//ЭКСПОРТ
export {
  //initialCards,
  selectors,
  editButton,
  addButton,
  cards,
  avatarImg,
  nameEdit,
  profEdit,
  editForm,
  inputNameAddCardPopup,
  inputLinkAddCardPopup,
  formAddCardPopup,
  editAvatar,
  apiSetting,
};
