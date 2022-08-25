import React from 'react';
import { Link, NavLink } from "react-router-dom";

// ---------------------------------

import cross from '../../images/cross.svg';

// ---------------------------------

function Navigation(props){
  return (
    <div className={`navigation ${!props.isOpen || "navigation_opened"}`}>
      <nav className="navigation__menu">
        <NavLink exact to="/" className="navigation__link" activeClassName="navigation__link_selected" onClick={props.onCrossClick}>Главная</NavLink>
        <NavLink to="/movies" className="navigation__link" activeClassName="navigation__link_selected" onClick={props.onCrossClick}>Фильмы</NavLink>
        <NavLink to="/saved-movies" className="navigation__link" activeClassName="navigation__link_selected" onClick={props.onCrossClick}>Сохранённые фильмы</NavLink>
        <Link className="navigation__profile-link" to="/profile" onClick={props.onCrossClick}>Аккаунт</Link>
        <img className="navigation__cross" src={cross} alt="значок-крестик" onClick={props.onCrossClick} />
      </nav>
    </div>
  )
}

export default Navigation;
