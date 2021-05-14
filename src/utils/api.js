import { METHOD } from './constants.js'

class Api {
  constructor (config) {
    this.url = config.url
    this.headers = config.headers
  }


  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    }
  return Promise.reject(new Error(`Произошла ошибка со статус кодом ${res.status}`))
  }
    
  getCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    })
    .then(this._handleResponse)  
  }

  createCard({name, link}) {
    return fetch(`${this.url}/cards`, {
      method: METHOD.POST,
      headers: this.headers,
      body: JSON.stringify({ name, link })
    })
    .then(this._handleResponse)
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: METHOD.DELETE,
      headers: this.headers,
    })
    .then(this._handleResponse)
    }



 changeLikeCardStatus(cardId, likeStatus) {
  if (likeStatus) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: METHOD.PUT,
      headers: this.headers,
    }).then(this._handleResponse)
  } else {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: METHOD.DELETE,
      headers: this.headers,
    }).then(this._handleResponse)
    }
  }

  getMyInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    })
    .then(this._handleResponse)
  }

  updateMyInfo({name, about}) {
    return fetch(`${this.url}/users/me`, {
      method: METHOD.PATCH, 
      headers: this.headers,
      body: JSON.stringify({ name, about })
    })
    .then(this._handleResponse)
  }

  updateMyAvatar(avatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: METHOD.PATCH, 
      headers: this.headers,
      body: JSON.stringify({ avatar })
    })
    .then(this._handleResponse)
  }
}


const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: '5272ec4f-012a-4dd0-babb-fcf2aac8eb04',
    'Content-Type': 'application/json'
  }
})

export default api


