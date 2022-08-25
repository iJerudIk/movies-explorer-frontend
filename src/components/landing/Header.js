import React from 'react';
import { Link } from "react-router-dom";

// ---------------------------------

import logo from '../../images/logo.svg';
import hamburger from '../../images/hamburger.svg';

// ---------------------------------

function Header(props){
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__left-part">
        <Link className="header__logo" to="/"><img src={logo} alt="логотип" /></Link>
          { !props.loggedIn ||
            (
              <>
                <Link className="header__film-link" to="/movies">Фильмы</Link>
                <Link className="header__film-link" to="/saved-movies">Сохранённые фильмы</Link>
              </>
            )
          }
        </div>
        <div className="header__right-part">
          { props.loggedIn ?
            (
              <>
                <Link className="header__profile-link" to="/profile">Аккаунт</Link>
                <img className="header__hamburger" src={hamburger} alt="значок-меню" onClick={props.onMenuClick} />
              </>
            ) :
            (
              <>
                <Link className="header__auth-link" to="/signup">Регистрация</Link>
                <Link className="header__auth-link header__auth-link_theme_dark" to="/signin">Войти</Link>
              </>
            )
          }
        </div>
      </div>
    </header>
  )
}

export default Header;
