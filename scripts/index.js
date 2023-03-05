//КНОПКИ
const editButton = document.querySelector('.edit-button');//кнопка редактирования профиля
const closeButtons = document.querySelectorAll('.close-button');//кнопки закрытия попапов
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
//const popup = document.querySelector('.popup');//общий класс всех попапов
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

//ШАБЛОННЫЕ ОБРАБОТЧИКИ
//обработчик открытия формы
function openPopup (element) {
  element.classList.add('popup_open');
  //закрываем попап по нажатию на Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      closePopup (element);
    }
  });
}
//обработчик закрытия формы
function closePopup (element) {
  element.classList.remove('popup_open');
  //удаляем обработчик кнопки Esc
  window.removeEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      closePopup (element);
    }
  });
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
  openPopup (profilePopup)
    nameEdit.value = userName.textContent;
    profEdit.value = userJob.textContent;
    inputElements = editForm.querySelectorAll('.edit-form__personalia');
    inputElements.forEach((inputElement) => {
      hideInputError(editForm, inputElement);
      const buttonElement = editForm.querySelector('.save-button');
      deleteDisabledButton (buttonElement);
    })
}
editButton.addEventListener('click', handlerOpeningFormPopupProfile);
// открываем картинку из карточки
function handlerOpeningPopapImageZoom (name, link) {
  const photo = photoPopupImageZoom;
  photo.src = link;
  photo.alt = name;
  const title = titlePopupImageZoom;
  title.textContent = name;
  openPopup(popapImageZoom);
}
//открываем попап добавления карточки
function handlerOpeningFormPopupAddCard () {
  formAddCardPopup.reset();
  //inputElement = formAddCardPopup.querySelector('.edit-form__personalia');
  //hideInputError(formAddCardPopup, inputElement);
  openPopup(addCardPopup);
  inputElements = formAddCardPopup.querySelectorAll('.edit-form__personalia');
    inputElements.forEach((inputElement) => {
      hideInputError(formAddCardPopup, inputElement);
    })
}
addButton.addEventListener('click', handlerOpeningFormPopupAddCard);

//ЗАКРЫТИЕ ПОПАПОВ
//универсальный обработчик закрытия попапов
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');// находим ближайший к кнопке попап
  button.addEventListener('click', () => closePopup(popup)); // устанавливаем обработчик закрытия на кнопку
});
//закрываем попап редактирования профиля
function handlerClosingFormPopupProfile () {
  closePopup (profilePopup)
}
//закрываем попап добавления карточки
function handlerClosingFormPopupAddCard () {
  closePopup (addCardPopup);
}
//закрываем окно с картинкой
function handlerClosingPopapImageZoom () {
  closePopup (popapImageZoom);
}
//закрытие попапа по клику на оверлей!!
const popup = document.querySelectorAll('.popup');//общий класс всех попапов
popup.forEach((popups) => {
  const popup = popups.closest('.popup');
  const closePopupOnClickOverlay = (event) => {
    if (event.target === event.currentTarget) {
    closePopup (popup);
  }
};
popup.addEventListener('click', closePopupOnClickOverlay);
});

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
