import React from 'react';

// ---------------------------------

import FormAuth from './FormAuth';
import logo from '../../../images/logo.svg';

// ---------------------------------

function Login(props){
  const email = React.useRef();
  const password = React.useRef();
  const [emailError, setEmailError] = React.useState({isError: true, isOriginal: true, message: "Почта невалидна"});
  const [passwordError, setPasswordError] = React.useState({isError: true, isOriginal: true, message: "Пароль невалиден"});

  function onLogin(evt) {
    props.onLogin(email.current.value, password.current.value);
  }

  function checkValidity(evt) {
    if(evt.target.name === "email"){
      const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{1,4})$/;
      if(email.current.value.length === 0) {setEmailError({isError: true, message: "Почта — обязательное поле"}); return}
      if(!regEmail.test(email.current.value)) {setEmailError({isError: true, message: "Почта невалидна"}); return}
      setEmailError({isError: false, message: "Почта валидна"});
    }

    if(evt.target.name === "password"){
      if(password.current.value.length === 0) {setPasswordError({isError: true, message: "Пароль — обязательное поле"}); return}
      if(password.current.value.length > 30) {setPasswordError({isError: true, message: "Пароль больше 30 знаков"}); return}
      if(password.current.value.length < 5) {setPasswordError({isError: true, message: "Пароль меньше 5 знаков"}); return}
      setPasswordError({isError: false, message: "Пароль валиден"});
    }
  }

  return (
    <section className="auth">
      <div className="auth__content">
        <img className="auth__logo" src={logo} alt="логотип" />
        <p className="auth__greeting">Рады видеть!</p>
        <FormAuth isRegister={false} onLogin={onLogin} isButtonActive={!(emailError.isError || passwordError.isError)}>
          <div className="auth__row">
            <label className="auth__row-name">E-mail</label>
            <input
              className={`auth__input ${emailError.isOriginal ? "auth__input" : (!emailError.isError || "auth__input_invalid")}`}
              type="email" name="email" placeholder="Почта" onChange={checkValidity} ref={email}
            ></input>
            <p className={`auth__input-error ${emailError.isOriginal ? "auth__input-error_inactive" : (emailError.isError || "auth__input-error_inactive")}`}>
              {emailError.isOriginal || (!emailError.isError || emailError.message)}
            </p>
          </div>
          <div className="auth__row">
            <label className="auth__row-name">Пароль</label>
            <input
              className={`auth__input ${passwordError.isOriginal ? "auth__input" : (!passwordError.isError || "auth__input_invalid")}`}
              type="password" name="password" placeholder="Пароль" onChange={checkValidity} ref={password}
            ></input>
            <p className={`auth__input-error ${passwordError.isOriginal ? "auth__input-error_inactive" : (passwordError.isError || "auth__input-error_inactive")}`}>
              {passwordError.isOriginal || (!passwordError.isError || passwordError.message)}
            </p>
          </div>
        </FormAuth>
      </div>
    </section>
  )
}

export default Login;
