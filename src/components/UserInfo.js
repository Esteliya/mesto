export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this.name = document.querySelector(nameSelector);//имя пользователя
    this.about = document.querySelector(aboutSelector);//поле о себе
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
    //console.log('id пользователя: ', this._userId);
    return this._userId;
  }
}
