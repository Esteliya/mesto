const editButton = document.querySelector('.edit-button');
const closeButton = document.querySelector('.close-button');
const likeButton = document.querySelectorAll('.button-like');

let popup = document.querySelector('.popup');
let userName = document.querySelector('.profile__user-firstname');
let userJob = document.querySelector('.profile__user-profession');

let nameEdit = document.getElementById('firstname');
let profEdit = document.getElementById('profession');

let editForm = document.querySelector('.edit-form');

const addCardPopup = document.getElementById('add-card');//див попапа
const nameCard = document.getElementById('name-card');//поле заполнения названия карточки
const imagesPopap = document.getElementById('images');//поле заполнения ссылки img
const addForm = document.querySelector('#add-form');//форма с инпутами
const addButton = document.querySelector('.add-button');//кнопка добавления карточки
const closeButtonImg = document.getElementById('close-add-card');//кнопка закрытия карточки

const cards = document.querySelector('.cards'); //секция с карточками
const templiteCard = document.querySelector('#templite-card').content; //темплит

let titleImagePopup = document.querySelector('.popap-photo-title');
let photoImagePopup = document.querySelector('.popap-photo')

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

//открываем попап редактирования профиля
function openPopup () {
    popup.classList.add('popup_open');
    nameEdit.value = userName.textContent;
    profEdit.value = userJob.textContent;
}
editButton.addEventListener('click', openPopup);

//закрываем  попап редактирования профиля
function closePopup () {
    popup.classList.remove('popup_open');

}
closeButton.addEventListener('click', closePopup);

//пользователь вносит изменения в профиль
function editProfile(eve){
    eve.preventDefault();
    userName.textContent = nameEdit.value;
    userJob.textContent = profEdit.value;
    closePopup ();
}
editForm.addEventListener('submit', editProfile);

function removeCard () {
  const cardDelite = document.querySelector('.card').remove();
  console.lod('функция удаления работает');
}

const popupImg = document.querySelector('#img-popup')
// открываем картинку из карточки
function openPopupImg (name, link) {
  const photo = popupImg.querySelector('.popap-photo');
  photo.src = link;
  photo.alt = name;
  const title = popupImg.querySelector('.popap-photo-title');
  title.textContent = name;
  popupImg.classList.add('popup_open');
}

const closeImgButton = document.querySelector('#close-img-card');
//закрываем окно с картинкой
function closePopupImg () {
  popupImg.classList.remove('popup_open');

}
closeImgButton.addEventListener('click', closePopupImg);

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
  openPopupImg(name, link);
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
cards.prepend(newCard);
}

// создаем карточку из коробки
initialCards.forEach(function (element) {
  createCard(element.name, element.link)
})

//карточка из попапа версия 2
function formSubmitHandler (eve, name, link) {
  eve.preventDefault();
  createCard(name, link);
  closePopupForCard ()
};
addForm.addEventListener('submit', (evt) => {
  formSubmitHandler (evt, nameCard.value, imagesPopap.value);
});

//открываем попап добавления карточки
function openPopupForCard () {
  addCardPopup.classList.add('popup_open');
  addForm.reset();
}
addButton.addEventListener('click', openPopupForCard);

//закрываем попап добавления карточки
function closePopupForCard () {
  addCardPopup.classList.remove('popup_open');
}
closeButtonImg.addEventListener('click', closePopupForCard);
