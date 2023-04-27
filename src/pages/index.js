import "./index.css";

//ИМПОРТ
import {
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
} from "../components/customize.js";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { selectors, apiSetting } from "../components/customize.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import СonfirmationPopup from "../components/СonfirmationPopup.js";
import UserInfo from "../components/UserInfo.js";
import { Api } from "../components/Api.js";


//ВАЛИДАЦИЯ
//валидация формы редактирования профиля
const validatorEditProfile = new FormValidator(selectors, editForm);
validatorEditProfile.enableValidation();

//валидация формы создания карточки
const validatorformAddCard = new FormValidator(selectors, formAddCardPopup);
validatorformAddCard.enableValidation();

//валидация формы редактирования аватарки
const validatorEditAvatar = new FormValidator(selectors, editAvatar);
validatorEditAvatar.enableValidation();

//API
const api = new Api(apiSetting);

//получаем одновременно данные сервера
Promise.all([api.getUserInfo(), api.getArrCards()])//данные пользователя и массив карточек
  .then(([userData, cardsData]) => {
    //console.log('userData', userData);
    //console.log('cardsData', cardsData);
    userProfile.setUserInfo(userData);//выводим на страницу данные профиля
    userProfile.setUserAvatar(userData);//заправшиваем картинку с сервера
    defaultCard.rendererItems(cardsData);//запрашиваем массив карточек с сервера
  })
  .catch((err) => {
    console.error(`Ошибка: ${err}`);
  });

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
  nameSelector: selectors.nameSelector,//html-строка имени профиля
  aboutSelector: selectors.aboutSelector,//html-строка профессии
  avatarSelector: selectors.avatarSelector,//html <img src=#>
});

//ОБРАБОТЧИКИ ФОРМ
//обработчик формы данных профиля: данные из формы —> в профиль. Вызываем при создании попапа.
const handlerFormSubmitEdit = (data) => {
  popupFormProfile.disableButton("Сохранение...");//меняем текст кнопки
  api.patchUserInfo(data)//передаем данные инпутов на сервер +
    .then((res) => {
      userProfile.setUserInfo(res);
    })
    .catch((error) => {
      console.error(`Ошибка: ${error}`)
    })
    .finally(() => {
      popupFormProfile.disableButton("Сохранить", false);//возвращаем текст кнопки
    })

}
//обработчик формы подтверждения удаления
const handlerFormSubmitСonfirmation = (cardId, newCard) => {
  confirmationPopup.disableButton("Удаление...");//меняем текст кнопки
  api.deleteCard(cardId)
    .then(() => {
      newCard.handlerDeleteButton();//удаляем карточку из разметки
      confirmationPopup.close();//закрываем попап
    })
    .catch((error) => {
      console.error(`Ошибка: ${error}`)
    })
    .finally(() => {
      confirmationPopup.disableButton("Да", false);//возвращаем текст кнопки
    })
};


//обработчик формы редактирования аватарки ?????
const addAvatar = (data) => {
  // debugger;
  popupAddAvatar.disableButton("Сохранение...");//меняем текст кнопки
  api.patchAvatar(data)
    .then((res) => {
      //debugger;
      userProfile.setUserAvatar(res);//вставить картинку в разметку
      popupAddAvatar.close();//закрываем попап
    })
    .catch((error) => {
      console.error(`Ошибка: ${error}`)
    })
    .finally(() => {
      popupAddAvatar.disableButton("Сохранить", false);//возвращаем текст кнопки
    })
};

// обработчик формы создания новой карточки
const addUserCard = () => {
  const cardItem = {
    name: inputNameAddCardPopup.value,
    link: inputLinkAddCardPopup.value,
  };
  api.postUserCard(cardItem)//передаем данные инпутов на сервер
    .then((res) => {//получили ответ от сервера
      renderCard(res);//отрисовываем карточку на странице
    })
    .catch((error) => {
      console.error(`Ошибка: ${error}`)
    })
    .finally(() => {
      confirmationPopup.disableButton("Да", false);//возвращаем текст кнопки
      popupAddAvatar.disableButton("Сохранение...");//меняем текст кнопки

    })
}

//СОЗДАЕМ КАРТОЧКИ
//создание карточки
function createCard(data) {
  const newCard = new Card(
    data,
    selectors.templiteSelector,
    () => {
      popupZoomImage.open(data);
    },
    //функция обработчик клика по кнопке удаления
    (cardId) => {
      confirmationPopup.open(cardId, newCard)
    },
    //обработчик лайка
    () => {
      if (!newCard.checkMyLiked()) {
        api.putLike(data._id)
          .then((res) => {
            newCard.updateLikes(res);
          })
          .catch((error) => {
            console.error(`Ошибка putLike: ${error}`)
          })
      } else {
        api.deleteLike(data._id)
          .then((res) => {
            newCard.updateLikes(res);
          })
          .catch((error) => {
            console.error(`Ошибка deleteLike: ${error}`)
          })
      }
    },
    userProfile.getUserId()//вернули id
  );
  //console.log(data);
  const cardElement = newCard.generateCard();
  return cardElement;
}
//карточки из массива
const defaultCard = new Section(
  {
    renderer: (item) => {
      const newCards = createCard(item);
      defaultCard.addItem(newCards);//вставляем карточки на страницу
    }
  },
  '.cards');
//отрисовка карточки в DOM
const renderCard = (data) => {
  cards.prepend(createCard(data));
};

//ПОПАПЫ
//попап редактирования профиля
const popupFormProfile = new PopupWithForm(selectors.popupProfile, handlerFormSubmitEdit);
popupFormProfile.setEventListeners();
//попап добавления пользовательской карточки
const popupAddCard = new PopupWithForm(selectors.popupAddCard, addUserCard);
popupAddCard.setEventListeners();
const popupZoomImage = new PopupWithImage(selectors.popupZoom);
popupZoomImage.setEventListeners();
//попап подтверждения удаления карточки
const confirmationPopup = new СonfirmationPopup(selectors.popupDelete, handlerFormSubmitСonfirmation);
confirmationPopup.setEventListeners();
//попап редактирования аватарки
const popupAddAvatar = new PopupWithForm(selectors.popupAddAvatar, addAvatar);
popupAddAvatar.setEventListeners();

//СЛУШАТЕЛИ
//открываем попап редактирования профиля
editButton.addEventListener('click', popupEditProfile);//открываем попап редактирования профиля
//открываем попап добавления пользовательской карточки
addButton.addEventListener('click', () => {
  popupAddCard.open();
  validatorformAddCard.removeValidationErrors();
});
//открываем попап редактирования аватарки
avatarImg.addEventListener('click', () => {
  //debugger;
  popupAddAvatar.open();
  validatorEditAvatar.removeValidationErrors();//сброс ошибок валидации
});

