import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
  let link = '',
    linkText = '';
  if (props.location.pathname === '/sign-in') {
    link = '/sign-up';
    linkText = 'Регистрация';
  } else if (props.location.pathname === '/sign-up') {
    link = '/sign-in';
    linkText = 'Войти';
  }
  
  return (
  <header className="header">
    <img src={logo} className="header__logo" alt="место россия"/>
    <div className="header__container">
        {props.loggedIn ? (
          <>
            <div className="header__user-email">{props.email}</div>
            <button className="header__exit-button button" onClick={props.handleLogout}>
              Выйти
            </button>
          </>
        ) : (
          <Link className="header__link" to={link}>
            {linkText}
          </Link>
        )}
      </div>
  </header>
  )
}

export default withRouter (Header)