import React from 'react';
import { useHistory } from 'react-router-dom';
import success from '../images/success.svg';
import error from '../images/error.svg';

function InfoTooltip(props) {
  const history = useHistory();
  const image = props.isSuccess ? success : error;
  const popupText = props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';

  function closeHandler() {
    props.onClose();

    if (props.isSuccess) {
      history.push('/sign-in');
    }
  }

  return (
    <div className={`popup popup_after-sign ${props.isOpen ? 'popup_active' : ''}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={closeHandler}
        ></button>
        <form
          className="popup__form"
          name="after-sign"
          onSubmit={closeHandler}
          action="#"
          method="GET"
          noValidate
        >
          <img
            className="popup__auth-image"
            src={image}
          />
          <h2 className="popup__text">{popupText}</h2>
        </form>
      </div>
    </div>
  );
}

export default InfoTooltip;