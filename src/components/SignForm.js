import React from 'react';

function SignForm(props) {
  return (
    <form
      className="sign-form"
      name={props.name}
      onSubmit={props.onSubmit}
      action="#"
      method="GET"
      noValidate
    >
      <div className="sign-form__container">
        <h2 className="sign-form__title">{props.title}</h2>
        {props.children}
      </div>
      <div className="sign-form__bottom-container">
        <button type="submit" className="sign-form__submit-button">
          {props.submitText}
        </button>
        {props.hint}
      </div>
    </form>
  );
}

export default SignForm;