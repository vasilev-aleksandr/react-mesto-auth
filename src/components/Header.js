import logo from '../images/logo.svg';

function Header() {
  return (
  <header className="header">
    <img src={logo} className="header__logo" alt="место россия"/>
  </header>
  )
}

export default Header