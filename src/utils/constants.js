export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]

export const editButton = document.querySelector('.profile__edit-button')
export const addButton = document.querySelector('.profile__add-button')
export const avatarEditButton = document.querySelector('.profile__avatar-edit')

export const nameSelector = '.profile__name'
export const aboutSelector = '.profile__about'
export const avatarSelector = '.profile__avatar'

export const placesContainerSelector = '.places'
export const placeTemplateSelector = '#place-template'

export const popupPlaceSelector = '.popup_place'
export const popupProfileSelector = '.popup_profile'
export const popupImageSelector = '.popup_image'
export const popupAvatarSelector ='.popup_avatar'
export const popupDeleteConfirmSelector ='.popup_delete-confirm'

export const METHOD = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PUT: 'PUT',
    PATCH: 'PATCH',
}

export const CONFIG_API = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: '5272ec4f-012a-4dd0-babb-fcf2aac8eb04',
    'Content-Type': 'application/json'
  }
}

export const VALIDATOR_DATA = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button ',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorSelector: '.popup__error',
  errorClass: 'popup__error_visible',
}
