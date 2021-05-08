import React, { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({ _id: '', name: '', avatar: '', about: '' });

  useEffect(() => {
    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  

  useEffect(()=> {
    api
      .getMyInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.error(err);
      });
  },[]);



  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }


  function handleUpdateUser(userInfo) {
    api
      .updateMyInfo(userInfo)
      .then((userData) => {
        setCurrentUser(userData);
        setIsEditProfileOpen(false);
    })
      .catch((err) => {
        console.error(err);
      });
    }

  function handleUpdateAvatar({ avatar }) {
    api
      .updateMyAvatar(avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }


  function handleAddPlaceSubmit(card) {
    api
      .createCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]); 
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.error(err);
    });
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter(c => c._id !== card._id);
      setCards(newCards);
    })
      .catch(err => {
        console.log(err);
    });
  }


  function closeAllPopups() {
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null)
  }


  return (
  <CurrentUserContext.Provider value={currentUser}>
  <div className="container">
    <div className ="page">
    <Header />
    <Main 
      cards={cards}
      onEditAvatar={handleEditAvatarClick}
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onCardClick={handleCardClick}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDelete}
    />
    <Footer />
    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}
/>
    <PopupWithForm
      name="delete-confirm"
      title="Вы уверены?"
      submitText="Да"
      onClose={closeAllPopups}
    >
    </PopupWithForm>
    <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
  </div>
</div>
</CurrentUserContext.Provider>
  );
}

export default App;
