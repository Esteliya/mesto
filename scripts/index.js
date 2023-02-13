const editButton = document.querySelector('.edit-button');
const closeButton = document.querySelector('.close-button');
const likeButton = document.querySelectorAll('.button-like');

let popup = document.querySelector('.popup');
let userName = document.querySelector('.profile__user-firstname');
let userJob = document.querySelector('.profile__user-profession');

let nameEdit = document.getElementById('firstname');
let profEdit = document.getElementById('profession');

let editForm = document.querySelector('.edit-form');


function openPopup () {
    popup.classList.add('popup_open');
    nameEdit.value = userName.textContent;
    profEdit.value = userJob.textContent;
}

function closePopup () {
    popup.classList.remove('popup_open');

}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);


function editProfile(eve){
    eve.preventDefault();
    userName.textContent = nameEdit.value;
    userJob.textContent = profEdit.value;
    closePopup ();
}

editForm.addEventListener('submit', editProfile);


for (let i = 0; i < likeButton.length; i++) {
    likeButton[i].addEventListener("click", function() {
        likeButton[i].classList.toggle("button-like_activ");
      });
}
