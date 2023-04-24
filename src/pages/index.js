import "./index.css";

//ИМПОРТ
import {
  editButton,
  addButton,
  cards,
  userName,
  userAbout,
  nameEdit,
  profEdit,
  editForm,
  inputNameAddCardPopup,
  inputLinkAddCardPopup,
  formAddCardPopup,
 //apiSetting,//настройки api
} from "../components/customize.js";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { selectors, apiSetting } from "../components/customize.js";
import  Section  from "../components/Section.js";
import  PopupWithForm  from "../components/PopupWithForm.js";
import  PopupWithImage  from "../components/PopupWithImage.js";
import  СonfirmationPopup  from "../components/СonfirmationPopup.js";
import UserInfo from "../components/UserInfo.js";
import { Api } from "../components/Api.js";


//ВАЛИДАЦИЯ
//валидация формы редактирования профиля
const validatorEditProfile = new FormValidator(selectors, editForm);
validatorEditProfile.enableValidation();

//валидация формы создания карточки
const validatorformAddCard = new FormValidator(selectors, formAddCardPopup);
validatorformAddCard.enableValidation();


//API
const api = new Api(apiSetting);

//получаем одновременно данные сервера
Promise.all([api.getUserInfo(), api.getArrCards()])//данные пользователя и массив карточек
.then (([userData, cardsData]) => {
  userProfile.setUserInfo (userData);//выводим на страницу данные профиля

  //console.log('cardsData', cardsData);//массив карточек
  defaultCard.rendererItems(cardsData);//запрашиваем массив карточек с сервера
})
.catch((err) => {
  console.log(`Ошибка: ${err}`);
});

/* //запрашиваем данные пользователя
api.getUserInfo()
.then((result) => {
  //debugger;
  userName.textContent = result.name;
  userAbout.textContent = result.about;
}); */

/* //запрашиваем массив карточек с сервера
api.getArrCards()
.then ((res) => {
  //console.log(res);//получили массив
  defaultCard.rendererItems(res);//вугрузили карточки с сервера
}); */

//открываем попап редактирования профиля. Вызываем в слушателе кнопки редактирования.
const popupEditProfile = () => {
  const defaultUserData = userProfile.getUserInfo();//данные по умолчанию (ловим из профиля)
  //переносим данные в инпуты формы
  nameEdit.value = defaultUserData.name;//в инпут имени дефолтное имя
  profEdit.value = defaultUserData.about;//в инпут профессии дефолтную профессиию
  validatorEditProfile.removeValidationErrors();//сбрасываем ошибки
  popupFormProfile.open();//открыли попап редактирования профиля
}

//ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ
const userProfile = new UserInfo({
  nameSelector: ".profile__user-firstname",//html-строка имени профиля
  aboutSelector: ".profile__user-profession",//html-строка профессии
});

//передаем в профиль данные из формы. Вызываем при создании попапа.
const handlerFormSubmitEdit = (data)=> {
  //console.log(data);//ждем данные полей инпутов
  api.patchUserInfo(data)//передаем данные инпутов на сервер +
  .then ((res) => {
    popupFormProfile.disableButton("Сохранение...");
    userProfile.setUserInfo(res
      /* {name: data.name,//инпут имени
    about: data.about,//инпут профессии
  } */
    );
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`)
  })
  .finally(() => {
    popupFormProfile.disableButton("Сохранить", false);
  })

}
//обработчик формы подтверждения удаления
const handlerFormSubmitСonfirmation = (cardId, newCard) => {
  confirmationPopup.disableButton("Удаление...");
//console.log('все работает');
api.deleteCard (cardId)
.then (() => {
  newCard.handlerDeleteButton();//удаляем карточку из разметки
  confirmationPopup.close();//закрываем попап
})
.catch((error) => {
  console.log(`Ошибка: ${error}`)
})
.finally(() => {
  confirmationPopup.disableButton("Да", false);
})
};

//СОЗДАЕМ КАРТОЧКИ

//создание карточки
function createCard (data) {
  const newCard = new Card(
    data,
    '#templite-card',
    () => {
      popupZoomImage.open(data);
    },
    //функция обработчик клика по кнопке удаления ???
    //handlerOpenConfirmationPopup (data._id, newCard),
    (cardId) => confirmationPopup.open(cardId, newCard),
    userProfile.getUserId()
  );
  //console.log('data---',data);
  //console.log('data.owner._id---', data.owner._id);
  //console.log('userProfile.getUserId()---', userProfile.getUserId());
  //console.log('data createCard', data);
  //console.log(data._id);
  const cardElement = newCard.generateCard();
  return cardElement;
}

/* //обработчик открытия попапа подтверждения удаления
const handlerOpenConfirmationPopup = (cardId, card) => {
  confirmationPopup.open(cardId, card);
} */

//карточки из массива
const defaultCard = new Section (
  {
    renderer: (item) => {
      const newCards = createCard (item);
      //console.log('item', item);
      defaultCard.addItem(newCards);//вставляем карточки на страницу
    }
  },
  '.cards');
  //defaultCard.rendererItems(initialCards);//передаем массив данных карточек

//отрисовка карточки в DOM
const renderCard = (data) => {
  //console.log('data', data);
  cards.prepend(createCard(data));
};

// создаем карточку пользователя
const addUserCard = () => {
  const cardItem = {
    name: inputNameAddCardPopup.value,
    link: inputLinkAddCardPopup.value,
  };
  api.postUserCard(cardItem)//передаем данные инпутов на сервер
  .then ((res) => {//получили ответ от сервера
    renderCard(res);//отрисовываем карточку на странице
    //console.log(res);
  })
}

//ПОПАПЫ
//попап редактирования профиля
const popupFormProfile = new PopupWithForm ('.profile-popup', handlerFormSubmitEdit);
popupFormProfile.setEventListeners();
//попап добавления пользовательской карточки
const popupAddCard = new PopupWithForm ('.add-card-popup', addUserCard);
popupAddCard.setEventListeners();
const popupZoomImage = new PopupWithImage('.zoom-img-popup');
popupZoomImage.setEventListeners();
//попап подтверждения удаления карточки
const confirmationPopup = new СonfirmationPopup ('.delete-card-popup', handlerFormSubmitСonfirmation);
confirmationPopup.setEventListeners();

//СЛУШАТЕЛИ
//открываем попап редактирования профиля
editButton.addEventListener('click', popupEditProfile);//открываем попап редактирования профиля
//открываем попап добавления пользовательской карточки
addButton.addEventListener('click', () => {
  popupAddCard.open();
  validatorformAddCard.removeValidationErrors();
});
