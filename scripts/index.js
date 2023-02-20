//КНОПКИ
const editButton = document.querySelector('.edit-button');//кнопка редактирования профиля
const closeButton = document.querySelector('.close-button');//кнопка закрытия попапа
const likeButton = document.querySelectorAll('.button-like');//кнопка лайка
const addButton = document.querySelector('.add-button');//кнопка добавления карточки

//СЕКЦИИ И БЛОКИ НА СТРАНИЦЕ
//профиль на странице
const userName = document.querySelector('.profile__user-firstname');//строка профиля: имя пользователя
const userJob = document.querySelector('.profile__user-profession');//строка профиля: профессия пользователя
//блоки на страницы
const cards = document.querySelector('.cards'); //секция с карточками
//темплит
const templiteCard = document.querySelector('#templite-card').content; //темплит
const titleTempliteCard = document.querySelector('.card__title');//заголовок темплита
const imageTempliteCard = document.querySelector('.card__image');//картинка теплита

//ПОПАПЫ
//попап редактирования профиля
const profilePopup = document.querySelector('.profile-popup');//див попапа редактирования профиля
const nameEdit = document.getElementById('firstname');//инпут имя профиля
const profEdit = document.getElementById('profession');//инпут профессия
const editForm = document.querySelector('.edit-form-profile');//форма заполнения попапа

//попап добавления карточки
const addCardPopup = document.querySelector('.add-card-popup');//див попапа добавления карточки
const inputNameAddCardPopup = document.getElementById('name-card');//поле заполнения названия карточки
const inputLinkAddCardPopup = document.getElementById('images');//поле заполнения ссылки img
const formAddCardPopup = document.querySelector('.edit-form-add-card');//форма с инпутами

//попап увеличения фотографии
const popapImageZoom = document.querySelector('.zoom-img-popap');//див попапа увеличения фотографии
const titlePopupImageZoom = document.querySelector('.popap-photo-title');//попап: заголовок картинки
const photoPopupImageZoom = document.querySelector('.popap-photo')//попап: увеличенное изображение (картинка)

//УДАЛИТЬ vvv
const closeImgButton = document.querySelector('#close-img-card'); //кнопка закрытия попапа увеличенного изображения
const closeButtonImg = document.getElementById('close-add-card');//кнопка закрытия карточки

//массив карточек из коробки
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

//ШАБЛОННЫЕ ОБРАБОТЧИКИ
//обработчик открытия формы
function openPopup (element) {
  element.classList.add('popup_open');
}
//обработчик закрытия формы
function closePopup (element) {
  element.classList.remove('popup_open');
}
// шаблоная функция создания карточки
function createCard(name, link) {
  const newCard = templiteCard.cloneNode(true);
  const cardTitle = newCard.querySelector('.card__title') //заголовок карточки
  cardTitle.textContent = name;
  const cardImg = newCard.querySelector('.card__image'); //изображение карточки
  cardImg.style.backgroundImage=`url(${link})`;
  const removeButton = newCard.querySelector('.button-remove');
  const likeButton = newCard.querySelector('.button-like');
// открываем попап карточки
cardImg.addEventListener('click', () => {
  handlerOpeningPopapImageZoom(name, link);
});
// удаляем карточку
removeButton.addEventListener('click', function () {
  const cardDelite = removeButton.closest('.card');
  cardDelite.remove();
});
//лайкаем карточку
likeButton.addEventListener('click', function () {
  likeButton.classList.toggle('button-like_activ');
});
return newCard;
//cards.prepend(newCard);
}
//РЕДАКТИРОВАНИЕ
//пользователь вносит изменения в профиль
function editProfile(eve){
  eve.preventDefault();
  userName.textContent = nameEdit.value;
  userJob.textContent = profEdit.value;
  handlerClosingFormPopupProfile ();
}
editForm.addEventListener('submit', editProfile);

//УДАЛЕНИЕ КАРТОЧЕК
//функция удаления карточки
function removeCard () {
const cardDelite = document.querySelector('.card').remove();
}
//ОТКРЫВАЕМ ПОПАПЫ
//открываем попап редактирования профиля
function handlerOpeningFormPopupProfile () {
  openPopup (document.querySelector('.profile-popup'))
    nameEdit.value = userName.textContent;
    profEdit.value = userJob.textContent;
}
editButton.addEventListener('click', handlerOpeningFormPopupProfile);
// открываем картинку из карточки
function handlerOpeningPopapImageZoom (name, link) {
  const photo = photoPopupImageZoom;
  photo.src = link;
  photo.alt = name;
  const title = titlePopupImageZoom;
  title.textContent = name;
  popapImageZoom.classList.add('popup_open');
}
//открываем попап добавления карточки
function handlerOpeningFormPopupAddCard () {
  addCardPopup.classList.add('popup_open');
  formAddCardPopup.reset();
}
addButton.addEventListener('click', handlerOpeningFormPopupAddCard);

//ЗАКРЫТИЕ ПОПАПОВ
//закрываем попап редактирования профиля
function handlerClosingFormPopupProfile () {
  closePopup (document.querySelector('.profile-popup'))
}
closeButton.addEventListener('click', handlerClosingFormPopupProfile);
//закрываем попап добавления карточки
function handlerClosingFormPopupAddCard () {
  addCardPopup.classList.remove('popup_open');
}
closeButtonImg.addEventListener('click', handlerClosingFormPopupAddCard);

//закрываем окно с картинкой
function handlerClosingPopapImageZoom () {
  popapImageZoom.classList.remove('popup_open');
}
closeImgButton.addEventListener('click', handlerClosingPopapImageZoom);

//СОЗДАНИЕ КАРТОЧЕК
// создаем карточку из коробки
initialCards.forEach(function (element) {
  const newCard = createCard(element.name, element.link)
  cards.append(newCard);
});
//создаем карточку из попапа
function handlerCreateCardFromPopupAddCard (eve, name, link) {
  eve.preventDefault();
  const newCard = createCard(name, link);
  handlerClosingFormPopupAddCard ()
  cards.prepend(newCard);
};
formAddCardPopup.addEventListener('submit', (evt) => {
  handlerCreateCardFromPopupAddCard (evt, inputNameAddCardPopup.value, inputLinkAddCardPopup.value);
});
