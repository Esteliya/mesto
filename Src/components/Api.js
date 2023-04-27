class Api {
  constructor (data) {
    this._url = data.url;//основная строка url из customize
    this._headers = data.headers;//заголовок fetch из customize
  }
//проверяем ответ сервера
  _checkResponse (res) {
    if (res.ok) {//если все ок
      return res.json();//вернули данные (объект)
    } else {
      Promise.reject(res.status);//завершаем действия с ошибкой
    }
  }
//запрашиваем данные
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  //отправляем данные пользователя
  patchUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
    })
    .then(this._checkResponse);
  }

  //запрашиваем массив карточек с сервера
  getArrCards () {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  //создаем карточку пользователя -> отправляем данные на серввер
  postUserCard (data) {//ждем объект
    //debugger;
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(
        data,
        )
    })
    .then(this._checkResponse);
  }

 //удаляем карточку
 deleteCard (cardId) {
  return fetch(`${this._url}/cards/${cardId}`, {
    method: 'DELETE',
    headers: this._headers,
  })
  .then(this._checkResponse);
 }

 //отправляем аватарку на сервер
 patchAvatar(avatar) {
  return fetch(`${this._url}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify( avatar ),
  })
  .then(this._checkResponse);
}

//добавляем лайк карточке
putLike (cardId) {
  return fetch(`${this._url}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: this._headers,
  })
  .then(this._checkResponse);
}

//удаляем лайк карточки
deleteLike (cardId) {
  return fetch(`${this._url}/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: this._headers,
  })
  .then(this._checkResponse);
}
}

//ЭКСПОРТ
export { Api };
