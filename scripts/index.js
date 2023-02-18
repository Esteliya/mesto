const editButton = document.querySelector('.edit-button');
const closeButton = document.querySelector('.close-button');
const likeButton = document.querySelectorAll('.button-like');

let popup = document.querySelector('.popup');
let userName = document.querySelector('.profile__user-firstname');
let userJob = document.querySelector('.profile__user-profession');

let nameEdit = document.getElementById('firstname');
let profEdit = document.getElementById('profession');

let editForm = document.querySelector('.edit-form');

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

//массив карточек из коробки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Ай-Петри',
    link: 'https://images.unsplash.com/photo-1580192528624-9e7054afb894?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80'
  },
  {
    name: 'Карелия',
    link: 'https://images.unsplash.com/photo-1660489121766-55708d62b800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80'
  },
  {
    name: 'Озеро Рица',
    link: 'https://images.unsplash.com/photo-1601029723757-37cb45309818?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cards = document.querySelector('.cards'); //секция с карточками
const templiteCard = document.querySelector('#templite-card').content; //темплит

function remuveCard () {
  const cardDelite = document.querySelector('.card').remuve();
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

let titleImagePopup = document.querySelector('.popap-photo-title');
let photoImagePopup = document.querySelector('.popap-photo')
//создаем карточки из коробки
initialCards.forEach(function (element) {
  const newCard = templiteCard.cloneNode(true);
  const cardTitle = newCard.querySelector('.card__title') //заголовок карточки
  cardTitle.textContent = element.name;
  const cardImg = newCard.querySelector('.card__image'); //изображение карточки
  cardImg.style.backgroundImage=`url(${element.link})`;
  const remuveButton = newCard.querySelector('.button-remuve');
  const likeButton = newCard.querySelector('.button-like');
// открываем попап карточки
  cardImg.addEventListener('click', () => {
    openPopupImg(element.name,element.link);
    console.log(element.link);
  });
  // удаляем карточку
  remuveButton.addEventListener('click', function () {
    const cardDelite = remuveButton.closest('.card');
    cardDelite.remove();
  });
  //лайкаем карточку
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('button-like_activ');
  });
  cards.append(newCard);
});
editForm.addEventListener('submit', editProfile);


const addCardPopup = document.getElementById('add-card');//див попапа
const nameCard = document.getElementById('name-card');//поле заполнения названия карточки
const imagesPopap = document.getElementById('images');//поле заполнения ссылки img
const addForm = document.querySelector('#add-form');//форма с инпутами
const addButton = document.querySelector('.add-button');//кнопка добавления карточки
const closeButtonImg = document.getElementById('close-add-card');//кнопка закрытия карточки

//добавляем новую карточку из попапа
function createUserCard (eve, name, link) {
  eve.preventDefault();
  const userCard = templiteCard.cloneNode(true); //создаем новую карточку пользователя
  const userCardTitle = userCard.querySelector('.card__title') //заголовок карточки
  userCardTitle.textContent = name;
  const userCardImg = userCard.querySelector('.card__image'); //изображение карточки
  userCardImg.style.backgroundImage=`url(${link})`;
  linkImage = userCardImg.style.backgroundImage.replace(/[url, (, ), "]/gi, '');//убираем лишние знаки
// открываем попап карточки
  userCardImg.addEventListener('click', () => {
    openPopupImg(name, link);
    console.log(`userCardTitle.textContent: ${userCardTitle.textContent}`);//нужный загголовок
    /*console.log(userCardImg.style.backgroundImage);//выдает нужный адрес, но в url()
    console.log(`linkImage: ${linkImage}`);//нужная ссылка
    console.log(link);//нужная ссылка*/

    //replace(/\s/g, '');
  });

// удаляем карточку
  const remuveButton = userCard.querySelector('.button-remuve');
    remuveButton.addEventListener('click', function () {
    const cardDelite = remuveButton.closest('.card');
    cardDelite.remove();
  });
  //лайкаем карточку
  const likeButton = userCard.querySelector('.button-like');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('button-like_activ');
  });
  cards.prepend(userCard);
  closePopupForCard ()
};
addForm.addEventListener('submit', (evt) => {
  createUserCard (evt, nameCard.value, imagesPopap.value);
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
