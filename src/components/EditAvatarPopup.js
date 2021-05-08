import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInput = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      submitText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input 
        id ='profile-avatar' 
        className="popup__input popup__input_profile_avatar"  
        name="link" 
        type="url" 
        placeholder="Ссылка на картинку" 
        ref={avatarInput} 
        required/>
      <span id="profile-avatar-error" className="popup__error"/>
    </PopupWithForm>

  )
}

export default EditAvatarPopup;
