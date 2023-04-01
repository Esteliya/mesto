//КНОПКИ
const editButton = document.querySelector('.edit-button');//кнопка редактирования профиля
const closeButtons = document.querySelectorAll('.close-button');//кнопки закрытия попапов
const addButton = document.querySelector('.add-button');//кнопка добавления карточки

//СЕКЦИИ И БЛОКИ НА СТРАНИЦЕ
//профиль на странице
const userName = document.querySelector('.profile__user-firstname');//строка профиля: имя пользователя
const userJob = document.querySelector('.profile__user-profession');//строка профиля: профессия пользователя
const cards = document.querySelector('.cards')//блок с карточками
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

//ИМПОРТ
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards, selectors } from "./customize.js";
import  Section  from "./Section.js";

//ШАБЛОННЫЕ ОБРАБОТЧИКИ

//функция закрытия попапа по нажатию кнопки Esc
const closesEscepe = (e) => {
  if (e.key === "Escape") {
    const element = document.querySelector('.popup_open');
    closePopup (element);
  }
}

//обработчик открытия формы
function openPopup (element) {
  element.classList.add('popup_open');
  //закрываем попап по нажатию на Esc
  document.addEventListener('keydown', closesEscepe);
}
//обработчик закрытия формы
function closePopup (element) {
  element.classList.remove('popup_open');
  //удаляем обработчик кнопки Esc
  document.removeEventListener('keydown', closesEscepe);
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

//ОТКРЫВАЕМ ПОПАПЫ
//открываем попап редактирования профиля
function handlerOpeningFormPopupProfile () {
  openPopup (profilePopup)
  nameEdit.value = userName.textContent;
  profEdit.value = userJob.textContent;
  validatorEditProfile.removeValidationErrors();
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
  openPopup(addCardPopup);
  validatorformAddCard.removeValidationErrors();
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
  validatorEditProfile.disabledButton(selectors);
}
//закрываем попап добавления карточки
function handlerClosingFormPopupAddCard () {
  closePopup (addCardPopup);
  validatorformAddCard.disabledButton(selectors);
}

//закрытие попапа по клику на оверлей
const popup = document.querySelectorAll('.popup');//общий класс всех попапов
popup.forEach((popup) => {
  const closePopupOnClickOverlay = (event) => {
    if (event.target === event.currentTarget) {
    closePopup (popup);
  }
};
popup.addEventListener('click', closePopupOnClickOverlay);
});

//создание карточки
function createCard (data, templateSelector) {
  const newCard = new Card(data, templateSelector);
  const cardElement = newCard.generateCard();
  return cardElement;
}

/*
//перебираем массив
initialCards.forEach((item) => {
  // Добавляем в DOM
  cards.append(createCard (item, '#templite-card'));//вставляем карточки на страницу
});
*/

//карточки из массива
const defaultCard = new Section (
  {
    items: initialCards,
    renderer: (item) => {
      const newCards = createCard (item, '#templite-card');
      defaultCard.addItem(newCards);//вставляем карточки на страницу
    }
  }, '.cards')
  defaultCard.rendererItems();


//СОЗДАЕМ КАРТОЧКИ
//проверка данных инпута
formAddCardPopup.addEventListener('submit', (e) => {
  e.preventDefault();
  const userData = {
    name: inputNameAddCardPopup.value,
    link: inputLinkAddCardPopup.value,
  }
  handlerClosingFormPopupAddCard ()
  // Добавляем в DOM
  cards.prepend(createCard(userData, '#templite-card'));//вставляем карточки на страницу (начало)
});

//ВАЛИДАЦИЯ
//валидация формы редактирования профиля
const validatorEditProfile = new FormValidator(selectors, editForm);
validatorEditProfile.enableValidation();

//валидация формы создания карточки
const validatorformAddCard = new FormValidator(selectors, formAddCardPopup);
validatorformAddCard.enableValidation();

//ЭКСПОРТ
export { handlerOpeningPopapImageZoom };
