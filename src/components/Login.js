import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignForm from './SignForm';

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function submitHandler(e) {
  handleLogin(e, email, password)
  }

  const hint = (
    <div className="sign-form__transition-hint">
      Ещё не зарегистрированы?{' '}
      <Link className="sign-form__link" to="/sign-up">
        Регистрация
      </Link>
    </div>
  );

  return (
    <SignForm name="sign-in" onSubmit={submitHandler} title="Вход" submitText="Войти" hint={hint}>
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
        />
      </label>
    </SignForm>
  );
}

export default Login;
