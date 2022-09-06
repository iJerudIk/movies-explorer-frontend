import React from 'react';
import { Link } from "react-router-dom";

// ---------------------------------

import FormAuth from './FormAuth';
import logo from '../../../images/logo.svg';

// ---------------------------------

function Register(props){
  const name = React.useRef();
  const email = React.useRef();
  const password = React.useRef();
  const [nameError, setNameError] = React.useState({isError: true, isOriginal: true, message: "Имя невалидно"});
  const [emailError, setEmailError] = React.useState({isError: true, isOriginal: true, message: "Почта невалидна"});
  const [passwordError, setPasswordError] = React.useState({isError: true, isOriginal: true, message: "Пароль невалиден"});

  function onRegister(evt) {
    props.onRegister(name.current.value, email.current.value, password.current.value);
  }

  function checkValidity(evt) {
    if(evt.target.name === "name"){
      if(name.current.value.length === 0) {setNameError({isError: true, message: "Имя — обязательное поле"}); return}
      if(name.current.value.length > 30) {setNameError({isError: true, message: "Имя больше 30 знаков"}); return}
      if(name.current.value.length < 2) {setNameError({isError: true, message: "Имя меньше 2 знаков"}); return}
      setNameError({isError: false, message: "Имя валидно"});
    }

    if(evt.target.name === "email"){
      const regEmail = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{1,4})$/;
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
        <Link className="auth__logo" to="/"><img src={logo} alt="логотип" /></Link>
        <p className="auth__greeting">Добро пожаловать!</p>
        <FormAuth isRegister={true} onRegister={onRegister} isButtonActive={!(nameError.isError || emailError.isError || passwordError.isError)}>
          <div className="auth__row">
            <label className="auth__row-name">Имя</label>
            <input
              className={`auth__input ${nameError.isOriginal ? "auth__input" : (!nameError.isError || "auth__input_invalid")}`}
              type="text" name="name" placeholder="Имя" onChange={checkValidity} ref={name}
            ></input>
            <p className={`auth__input-error ${nameError.isOriginal ? "auth__input-error_inactive" : (nameError.isError || "auth__input-error_inactive")}`}>
              {nameError.isOriginal || (!nameError.isError || nameError.message)}
            </p>
          </div>
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

export default Register;
