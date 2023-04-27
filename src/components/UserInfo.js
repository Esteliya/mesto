export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this.name = document.querySelector(nameSelector);//имя пользователя
    this.about = document.querySelector(aboutSelector);//поле о себе
    this._avatar = document.querySelector(avatarSelector);//аватарка
  }

  //вернем данные пользователя (для заполнения формы)
  getUserInfo() {
    return {
      name: this.name.textContent,//имя пользователя
      about: this.about.textContent,//о пользователе
    };
  }

  //создаем новые данне пользователя (получаем из формы)
  setUserInfo({ name, about, _id }) {
    this.name.textContent = name;//передаем имя
    this.about.textContent = about;//передаем данные о пользователе
    this._userId = _id;
  }

  //возвращаем ID пользователя
  getUserId () {
    return this._userId;
  }

  //изменяем аватарку профиля
  setUserAvatar ({avatar}) {
    this._avatar.src = avatar;
  }
}
