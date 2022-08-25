import React from 'react';
import { Link } from "react-router-dom";

// ---------------------------------

function FormAuth(props){
  function handleSubmit(evt) {
    evt.preventDefault();
    // -
    if(props.isRegister) props.onRegister();
    else props.onLogin();
  }

  return (
    <form className="auth__form">
      <div className="auth__inputs">
        {props.children}
      </div>
      <div className="auth__buttons">
        <button className="auth__button-submit" type="submit" onClick={handleSubmit}>
          {props.isRegister ? "Зарегистрироваться" : "Войти"}
        </button>
        <p className="auth__choice">
          {props.isRegister ? "Уже зарегистрированы? " : "Ещё не зарегистрированы? "}
          <Link className="auth__link" to={props.isRegister ? "/signin" : "/signup"}>
            {props.isRegister ? "Войти" : "Регистрация"}
          </Link>
        </p>
      </div>
    </form>
  )
}

export default FormAuth;
