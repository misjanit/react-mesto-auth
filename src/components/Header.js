import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import logo from '../images/Logo.svg';


// 'header__login-button';
// 'header__login-button_unactive'
// 'header__login-button_logged-in' - если пользователь вошёл

// 'header__email' // - показать email
// header__email_unactive  - убрать email

// header__button-icon - иконка меню
// header__button-icon_close - вместо меню крестик



const Header = ({ email, onSignOut, loggedIn }) => {

  const [clicked, setClicked] = useState(false);

  function handlerClass() {
    if (!clicked) setClicked(true);
    else setClicked(false);
  }

  function handleSignOut() {
    setClicked(false);
    onSignOut();
  }

  return (
    <header className="header">
      <div className={clicked ? 'header__drop-menu' : 'header__drop-menu_unactive'}>
        <Route exact path="/">
          <h3 className={clicked ? 'header__drop-menu_email' : 'header__email_unactive'}>{email}</h3>
          <Link to="/" className={clicked ? 'header__drop-menu_logout header__login-button_logged-in' : ''} onClick={handleSignOut}>Выйти</Link>
        </Route>
      </div>
      <div className='header__main-header-wrapper'>
        <img src={logo} className="header__logo" alt="Логотип проекта" />
        <div className='header__wrapper'>
          <Switch>
            <Route exact path="/sign-up">
              <Link to="/sign-in" className={ loggedIn ? '' : 'header__login-button' }>Войти</Link>
            </Route>
            <Route exact path="/sign-in">
              <Link to="/sign-up" className={ loggedIn ? '' : 'header__login-button' }>Регистрация</Link>
            </Route>
            <Route exact path="/">
              <h3 className={loggedIn ? 'header__email_unactive' : 'header__email'}>{email}</h3>
              <Link to="/" className="header__logout-button header__login-button_logged-in" onClick={handleSignOut}>Выйти</Link>
              <button className='header__button-icon' onClick={handlerClass} />
            </Route>
          </Switch>
        </div>
      </div>
    </header>
  );
}

export default Header;



/*
className="header__login-button header__login-button_logged-in"


<div className='header__login-button_unactive' >
        <h3 className="header__email">{props.email}</h3>
        <button className="header__login-button">
          <Switch>
            <Route exact path="/sign-up">
              <Link to="/sign-in">Войти</Link>
            </Route>
            <Route exact path="/sign-in">
              <Link to="/sign-up">Зарегистрироваться</Link>
            </Route>
          </Switch>
        </button>
      </div>

<button className="header__button-icon_unactive" />

      */