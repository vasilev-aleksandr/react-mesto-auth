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
import auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({ _id: '', name: '', avatar: '', about: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipSuccess, setInfoTooltipSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

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

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth
        .checkToken(token)
        .then((res) => {
          if (res.data) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            history.push('/');
          }
        })
        .catch((err) => console.log(err));
    }
  }, [history, loggedIn]);




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

  function handleLogin(e, email, password) {
    e.preventDefault();
    
    if (!email || !password) {
      handleInfoTooltipOpen(false);
      return;
    }
    auth
      .authorize({password, email})
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          history.push('/');
        } else {
          handleInfoTooltipOpen(false);
        }
      })
      .catch((err) => {
        handleInfoTooltipOpen(false);
      });
  }

  function handleRegister(e, email, password) {
    e.preventDefault();

    auth
    .register({password, email})
    .then((res) => {
      if (res.data) {
        handleInfoTooltipOpen(true);
      } else {
        handleInfoTooltipOpen(false);
      }
    }).catch(()=>{
      handleInfoTooltipOpen(false);
    });

  }
  

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('token');
  }

  function handleInfoTooltipClose() {
    setIsInfoTooltipOpen(false);
  }

  function handleInfoTooltipOpen(isSuccess) {
    setIsInfoTooltipOpen(true);
    setInfoTooltipSuccess(isSuccess);
  }

  const mainPage = (
    <>
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
    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
    <PopupWithForm name="delete-confirm" title="Вы уверены?" submitText="Да" onClose={closeAllPopups}/>
    <ImagePopup card={selectedCard} onClose={closeAllPopups}/> 
    </>
  )

  return (
  
  <CurrentUserContext.Provider value={currentUser}>
  <div className="container">
    <div className ="page">
    <Header loggedIn={loggedIn} email={userEmail} handleLogout={handleLogout}/>
    <Switch>
      <Route path="/sign-up">
        <Register handleRegister={handleRegister} />
      </Route>
      <Route path="/sign-in">
        <Login handleLogin={handleLogin} />
      </Route>
      <ProtectedRoute exact path="/" loggedIn={loggedIn} component={mainPage} />
      <Route path="*">{loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}</Route>
    </Switch>
    <InfoTooltip
      isOpen={isInfoTooltipOpen}
      onClose={handleInfoTooltipClose}
      isSuccess={infoTooltipSuccess}
    />
  </div>
</div>
</CurrentUserContext.Provider>
  );
}

export default App;
