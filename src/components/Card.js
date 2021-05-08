import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `place__delete-button ${isOwn ? 'place__delete-button_visible': 'place__delete-button_hidden'}`; 
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `place__like ${isLiked && 'place__like_active'}`;
  
  return (
    <div className="place">
        <div className="place__photo" onClick={() => {onCardClick(card);}}style={{ backgroundImage: `url(${card.link})` }} alt={card.name}/>
        <div className="place__description">
          <h3 className='place__heading'>{card.name}</h3>
          <div className ='place__like-container'>
            <button className={cardLikeButtonClassName} type="button" onClick={() => { onCardLike(card) }}/> 
            <span className='place__like-counter'>{card.likes.length}</span>
          </div>
        </div>
        <button className={cardDeleteButtonClassName} type="button" onClick={() => { onCardDelete(card) }}/>
    </div>

  )}

  export default Card;