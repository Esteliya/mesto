class Card {
	constructor(
		data,
		templateSelector,
		handlerCardClick,
		handlerOpenConfirmationPopup,
		handleClickLike,
		userId
	) {
		this._data = data;
		this._name = data.name;//имя
		this._link = data.link;//картинка
		this._id = data._id;//id карточки ???
		this._likes = data.likes;
		this._ownerId = data.owner._id;
		this._templateSelector = templateSelector;//темплит
		this._handlerCardClick = handlerCardClick;//обработчик клика по карточке
		this._handlerOpenConfirmationPopup = handlerOpenConfirmationPopup;//обработчик открытия попапа водтверждения удаления
		this._handleClickLike = handleClickLike;//обработчик клика лайка
		this._userId = userId;
		this._myLike = false;
	}

	_getTemplate() {
		const cardElement = document//создали элемент
			.querySelector(this._templateSelector)//нашли темплит-элемент
			.content//извлекаем его содержимое
			.querySelector('.card')//в содержимом нашли элемент с классом card
			.cloneNode(true);//клонирование

		return cardElement;//возвращаем клонированный элемент
	}

	generateCard() {//вставляем данные из массива
		this._element = this._getTemplate();
		this._like = this._element.querySelector('.button-like');
		this._image = this._element.querySelector('.card__image');
		this._delete = this._element.querySelector('.button-remove');
		this._counter = this._element.querySelector('.card__like-counter');
		this._arreyLike();

		//console.log('this._delete', this._delete);
		this._setEventListeners();
		//this._requestId();

		this._image.style.backgroundImage = `url(${this._link})`;
		this._element.querySelector('.card__title').textContent = this._name;
		this._visualButtonDelete();


		this._startPageLikes();



		return this._element;
	}
	//вписываем количество лайков с сервера +
	_arreyLike() {
		this._counter.textContent = this._likes.length;
	}

	checkMyLiked() {
		return this._likes.some(user => user._id === this._userId)
	}




  //проверяем id лайка

	/* //обработчик клика лайка
	handlerLikeCard (likes) {
		this._likes = likes;
		this._counter.textContent = this._likes.length;//длина массива
		this._toggleLike ();//переключаем кнопку в разметке
	}

//переключаем лайк в разметке
	_toggleLike () {
		this._myLike = this._checkMyLiked ();
		if (this._myLike) {
			this._like.classList.remove('button-like_activ');
			console.log('лайк снимаем');
		} else {
			this._like.classList.add('button-like_activ');
			console.log('лайк ставим');
		}
	}

	 //проверяем id автора лайка (свой или нет)
*/
	/*
		_requestId () {
			fetch('https://mesto.nomoreparties.co/v1/cohort-64/cards', {
			headers: {
				authorization: '524c1b7c-bb91-4dd5-95f2-6bf707a74ceb'
			}
		})
			.then(res => res.json())
			.then((result) => {
				//console.log('проверка связи');
				result.forEach((num) => {
					console.log('как получить id', num.name, num.owner._id);
					console.log(num.owner._id === 'eef2b9374335bd2cab413a6c');//ждем true
					if (num.owner._id === 'eef2b9374335bd2cab413a6c') {//если true, добавляем класс
						console.log('сравнили id', num.owner._id);
						this._delete.classList.add('button-remove_show');
						//this._element.querySelector('.button-remove').classList.add('button-remove_show');
					} else {
						this._delete.classList.remove('button-remove_show');
					}
				})


					if (data.owner._id === myId) {
						console.log('как получить id', num.owner._id);
						//this._element.querySelector('.button-remove').classList.add('button-remove_show');
					} console.log('все сломалось');

				})
		}
	*/




	_zoomImageCard() {
		this._handlerCardClick(this._data);
	}

	//показываем кнопку удаления -> проверяем по id создателя
	_visualButtonDelete() {
		if (this._userId === this._ownerId) {
			//console.log('userId',this._userId);
			//console.log('ownerId',this._ownerId);
			//debugger;
			//console.log(true);
			//this._createDeleteButton();
			this._delete.classList.add('button-remove_show');
		}
	}

	updateLikes(res) {
		this._likes = res.likes;
		// console.log(res.likes);

		this._counter.textContent = res.likes.length;

		if (this.checkMyLiked()) {
			console.log('TRUE');
		} else {
			console.log('FALSE');
		}


		this._toggleLikeButton();
	}

	_startPageLikes() {
		console.log('this.checkMyLiked() = ' + this.checkMyLiked());
		const check = this.checkMyLiked();

		if (check) {
			console.log('Лайка ЕСТЬ, удаляем лайк');
			this._like.classList.add('button-like_activ');
		} else {
			console.log('Лайка нет, ставим лайк');
			// this._like.classList.add('button-like_activ');
		}
	}

	/* //отображение кнопки удаления
	_visualButtonDelete () {
		this._element.querySelector('.button-remove').classList.add('button-remove_show');
} */
	//кнопка лайка в карточке
	_toggleLikeButton() {
		this._like.classList.toggle('button-like_activ');
	}
	//удаление карточки из разметки
	handlerDeleteButton() {
		this._element.remove();
		this._element = null;
	}
	/* //обработчик клика по кнопке удаления карточки (с сервера)
	_handlerClickDeleteButton () {
		this._handlerOpenConfirmationPopup(this._id);
	} */



	//обработчик слушателей
	_setEventListeners() {
		//слушатель кнопки лайка
		this._like.addEventListener('click', () => {
			// this._handlerLikeButton();
			//this._handleClickLike();
			console.log('нажали кнопку лайка');
			this._handleClickLike();
		});

		/* //слушатель кнопки удаления
		this._element.querySelector('.button-remove').addEventListener('click', () => {
			this._handlerDeleteButton();
		}); */

		//слушаетль карточки - увеличение картинки
		this._image.addEventListener('click', () => {
			this._zoomImageCard(this._id, this._myLike);
		});
		//слушатель кнопки удаления
		this._delete.addEventListener('click', () => {
			//this._handlerClickDeleteButton();
			this._handlerOpenConfirmationPopup(this._id);
		});
	}
}

//ЭКСПОРТ
export { Card };
