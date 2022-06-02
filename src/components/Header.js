import React from 'react';
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

const Header = (props) => {
  return (
    <header className="header">
      <div className='header__main-header-wrapper'>
        <img src={logo} className="header__logo" alt="Логотип проекта" />
        <div className='header__wrapper'>
          <h3 className={ props.loggedIn ? 'header__email_unactive' : 'header__email' }>{props.email}</h3>
          <Switch>
            <Route exact path="/sign-up">
              <Link to="/sign-in" className="header__login-button">Войти</Link>
            </Route>
            <Route exact path="/sign-in">
              <Link to="/sign-up" className="header__login-button">Зарегистрироваться</Link>
            </Route>
            <Route exact path="/main">
              <Link to="/main" className="header__login-button header__login-button_logged-in" onClick={props.onSignOut}>Выйти</Link>
            </Route>      
          </Switch>              
        </div>
      </div>
    </header>
  );
}

export default Header;



/*
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