import React from 'react';

// ---------------------------------

import FormAuth from './FormAuth';
import logo from '../../../images/logo.svg';

// ---------------------------------

function Login(props){
  return (
    <section className="auth">
      <div className="auth__content">
        <img className="auth__logo" src={logo} alt="логотип" />
        <p className="auth__greeting">Рады видеть!</p>
        <FormAuth isRegister={false} {...props}>
          <div className="auth__row">
            <label className="auth__row-name">E-mail</label>
            <input className="auth__input auth__input_content_email" type="text" placeholder="Почта"></input>
            <p className="auth__input-error auth__input-error_content_email"></p>
          </div>
          <div className="auth__row">
            <label className="auth__row-name">Пароль</label>
            <input className="auth__input auth__input_content_password" type="text" placeholder="Пароль"></input>
            <p className="auth__input-error auth__input-error_content_password"></p>
          </div>
        </FormAuth>
      </div>
    </section>
  )
}

export default Login;
