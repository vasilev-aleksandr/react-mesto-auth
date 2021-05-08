import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm 
      name="profile"
      title="Редактировать профиль"
      submitText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit ={handleSubmit}
    >
      <input 
        id="profile-name" 
        className="popup__input popup__input_profile_name" 
        name="name" 
        minLength="2" 
        maxLength="40" 
        required  
        value={name} 
        onChange={(evt) => {setName(evt.target.value)}}/>
      <span className="profile-name-error popup__error"/>
      <input 
        id="profile-about" 
        className="popup__input popup__input_profile_about" 
        name="about" 
        minLength="2" 
        maxLength="200" 
        required 
        value={description} 
        onChange={(evt) => {setDescription(evt.target.value)}}/>
      <span className="profile-about-error popup__error"/>
    </PopupWithForm>
  )

}

export default EditProfilePopup;
