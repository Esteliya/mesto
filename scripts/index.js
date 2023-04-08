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
//import  Popup  from "./Popup.js";
import  PopupWithForm  from "./PopupWithForm.js";
//import  PopupWithImage  from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";

/*
//попап добавления карточки
addButton.addEventListener('click', () => {
  const popupFormCard = new PopupWithForm ('.add-card-popup');
  popupFormCard.open();
  validatorformAddCard.removeValidationErrors();
  });
*/

  //ВАЛИДАЦИЯ
//валидация формы редактирования профиля
const validatorEditProfile = new FormValidator(selectors, editForm);
validatorEditProfile.enableValidation();

//валидация формы создания карточки
const validatorformAddCard = new FormValidator(selectors, formAddCardPopup);
validatorformAddCard.enableValidation();


//открываем попап редактирования профиля. Вызываем в слушателе кнопки редактирования.
const popupEditProfile = () => {
  const defaultUserData = userProfile.getUserInfo();//данные по умолчанию (ловим из профиля)
  //переносим данные в инпуты формы
  nameEdit.value = defaultUserData.userName;//в инпут имени дефолтное имя
  profEdit.value = defaultUserData.userAbout;//в инпут профессии дефолтную профессиию
  validatorEditProfile.removeValidationErrors();//сбрасываем ошибки
  //validatorEditProfile.disabledButton(selectors);
  popupFormProfile.open();//открыли попап редактирования профиля
}

//ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ
const userProfile = new UserInfo({
  nameSelector: ".profile__user-firstname",//html-строка имени профиля
  aboutSelector: ".profile__user-profession",//html-строка профессии
});

//передаем в профиль данные из формы. Вызываем при создании попапа.
const handleFormSubmitEdit = (data)=> {
  userProfile.setUserInfo({
    userName: data.firstname,//инпут имени
    userAbout: data.profession,//инпут профессии
  });
}

//СОЗДАЕМ КАРТОЧКИ

//создание карточки
function createCard (data) {
  const newCard = new Card(data, '#templite-card');
  const cardElement = newCard.generateCard();
  return cardElement;
}
//карточки из массива
const defaultCard = new Section (
  {
    items: initialCards,
    renderer: (item) => {
      const newCards = createCard (item);
      defaultCard.addItem(newCards);//вставляем карточки на страницу
    }
  },
  '.cards')
  defaultCard.rendererItems();
/*
  //карточки пользователя (из попапа)
  formAddCardPopup.addEventListener('submit', (e) => {
    e.preventDefault();
    const userData = {
      name: inputNameAddCardPopup.value,
      link: inputLinkAddCardPopup.value,
    }
    //console.log(userData);
    const userNewCard = new Section (
      {
        items: [userData],//массив с валидными полями
        renderer: (item) => {
        const newCard = createCard (item);
        userNewCard.addItemStart(newCard);//вставляем карточки на страницу
      }
     },
     '.cards');
     //handlerClosingFormPopupAddCard ();//закрыли попап
     userNewCard.rendererItems();
  });
*/
//отрисовка карточки в DOM
const renderCard = (data) => {
  cards.prepend(createCard(data));
};

// создаем карточку пользователя
const addUserCard = () => {
  //console.log('пустой коллбэк работает. ЗАПОЛНИТЬ!')
  const cardItem = {
    name: inputNameAddCardPopup.value,
    link: inputLinkAddCardPopup.value,
  };
  renderCard(cardItem);
}

  //ПОПАПЫ
//попап редактирования профиля
const popupFormProfile = new PopupWithForm ('.profile-popup', handleFormSubmitEdit);
popupFormProfile.setEventListeners();
//попап добавления пользовательской карточки
const popupAddCard = new PopupWithForm ('.add-card-popup', addUserCard);//добавить коллбэк!
popupAddCard.setEventListeners();

//СЛУШАТЕЛИ
//открываем попап редактирования профиля
editButton.addEventListener('click', popupEditProfile);//открываем попап редактирования профиля
//открываем попап добавления пользовательской карточки
addButton.addEventListener('click', () => {
  popupAddCard.open();
});

/*
//РЕДАКТИРОВАНИЕ
//пользователь вносит изменения в профиль
function editProfile(eve){
  eve.preventDefault();
  userName.textContent = nameEdit.value;
  userJob.textContent = profEdit.value;
  //handlerClosingFormPopupProfile ();
}
editForm.addEventListener('submit', editProfile);
*/

//ШАБЛОННЫЕ ОБРАБОТЧИКИ
/*
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
*/

//ОТКРЫВАЕМ ПОПАПЫ
/*
//открываем попап редактирования профиля
function handlerOpeningFormPopupProfile () {
  openPopup (profilePopup)
  nameEdit.value = userName.textContent;
  profEdit.value = userJob.textContent;
  validatorEditProfile.removeValidationErrors();
}
editButton.addEventListener('click', handlerOpeningFormPopupProfile);
*/
/*
// открываем картинку из карточки
function handlerOpeningPopapImageZoom (name, link) {
  const photo = photoPopupImageZoom;
  photo.src = link;
  photo.alt = name;
  const title = titlePopupImageZoom;
  title.textContent = name;
  openPopup(popapImageZoom);
}
*/

/*
//попап добавления карточки
addButton.addEventListener('click', () => {
  const popupFormCard = new Popup ('.add-card-popup');
  popupFormCard.open('.add-card-popup');
  });
  */
  /*
addButton.addEventListener('click', () => {
  //console.log('работает');
  const popupFormCard = new Popup ('.add-card-popup');
  //console.log('еще работает');
  popupFormCard.open('.add-card-popup');
  //console.log('и тут работает');
  //popupFormCard.setEventListeners();
  });

*/
/*
//открываем попап добавления карточки
function handlerOpeningFormPopupAddCard () {
  formAddCardPopup.reset();
  openPopup(addCardPopup);
  validatorformAddCard.removeValidationErrors();
}
addButton.addEventListener('click', handlerOpeningFormPopupAddCard);
*/


/*
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
*/

/*
//перебираем массив
initialCards.forEach((item) => {
  // Добавляем в DOM
  cards.append(createCard (item, '#templite-card'));//вставляем карточки на страницу
});
*/


/*
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
*/






