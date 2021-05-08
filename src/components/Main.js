import React, {useContext } from 'react';
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main(props) {


  const currentUser = useContext(CurrentUserContext);


  return (
    <main className="main">
    <section className="profile">
    <button className="profile__avatar-edit" style={{ backgroundImage: `url(${currentUser.avatar})` }} onClick={props.onEditAvatar}></button>
    <div className="profile__info">
      <div className="profile__name-container">
       <h1 className="profile__name">{currentUser.name}</h1>
       <button className="profile__edit-button button" type="button" onClick={props.onEditProfile}></button>
      </div>
      <p className="profile__about">{currentUser.about}</p>
    </div>
    <button className="profile__add-button button" type="button" onClick={props.onAddPlace}></button>
    </section>
    <section className="places">
    {props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
    </section>
  </main>
  )
}

export default Main