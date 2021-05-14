import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignForm from './SignForm';

function Register({handleRegister}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function submitHandler(e) {
    handleRegister(e, email, password)
  }

  const hint = (
    <div className="sign-form__transition-hint">
      Уже зарегистрированы?{' '}
      <Link className="sign-form__link" to="/sign-in">
        Войти
      </Link>
    </div>
  );

  return (
    <SignForm
      name="sign-in"
      onSubmit={submitHandler}
      title="Регистрация"
      submitText="Зарегистрироваться"
      hint={hint}
    >
      <label className="sign-form__field">
        <input
          className="sign-form__input"
          id="input-sign-email"
          name="email"
          type="email"
          value={email}
          onChange={(evt) => {
            setEmail(evt.target.value);
          }}
          placeholder="Email"
          required
        />
        <span
          className="sign-form__input-error sign-form__input-error_active"
          id="input-edit-name-error"
        ></span>
      </label>
      <label className="sign-form__field">
        <input
          className="sign-form__input"
          id="input-sign-password"
          name="password"
          type="password"
          value={password}
          onChange={(evt) => {
            setPassword(evt.target.value);
          }}
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="32"
        />
      </label>
    </SignForm>
  );
}

export default Register;