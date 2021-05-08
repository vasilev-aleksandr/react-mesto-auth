export const validatorData = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button ',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorSelector: '.popup__error',
  errorClass: 'popup__error_visible',
}

export const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: '5272ec4f-012a-4dd0-babb-fcf2aac8eb04',
    'Content-Type': 'application/json'
  }
}