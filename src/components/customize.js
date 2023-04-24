//массив карточек из коробки
/*
const initialCards = [
  {
    name: 'Карелия',
    link: 'https://images.unsplash.com/photo-1660489121766-55708d62b800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80'
  },
  {
    name: 'Салтинский водопад',
    link: 'https://images.unsplash.com/photo-1665235482670-460c531bdbea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1634745186518-db2e653372c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Алтай',
    link: 'https://images.unsplash.com/photo-1619417606952-552a15237367?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Озеро Рица',
    link: 'https://images.unsplash.com/photo-1665883185678-ba092ce12f38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Ай-Петри',
    link: 'https://images.unsplash.com/photo-1630094466385-a9a7b8596ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
];
*/

//КНОПКИ
const editButton = document.querySelector('.edit-button');//кнопка редактирования профиля
const addButton = document.querySelector('.add-button');//кнопка добавления карточки

//СЕКЦИИ И БЛОКИ НА СТРАНИЦЕ
//профиль на странице
const cards = document.querySelector('.cards')//блок с карточками
const userName = document.querySelector('.profile__user-firstname');//имя профиля
const userAbout = document.querySelector('.profile__user-profession');//о себе
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
  buttonSelector: '.save-button',//кнопка сохранения
  disabledButtonSelector: 'save-button-disabled',//неактивная кнопка
  inputErrorSelector: 'input-error',//нижнее подчеркивание инпута
  spanErrorSelector: 'edit-form__personalia-error_active',//активная строка ошибки
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
  userName,
  userAbout,
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
