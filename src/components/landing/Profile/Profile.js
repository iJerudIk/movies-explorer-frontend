import React from 'react';

// ---------------------------------

import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';

// ---------------------------------

function Profile(props){
  const [isEditMode, setIsEditMode] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);

  const name = React.useRef();
  const email = React.useRef();
  const [nameDefaultValue, setNameDefaultValue] = React.useState('');
  const [emailDefaultValue, setEmailDefaultValue] = React.useState('');
  const [nameError, setNameError] = React.useState({isError: false, message: "Имя валидно"});
  const [emailError, setEmailError] = React.useState({isError: false, message: "Почта валидна"});
  const [differentError, setDifferentError] = React.useState({isError: true, message: "Данные не отличаются"})

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmitEdition(name.current.value, email.current.value);
    setDifferentError({isError: true, message: "Данные не отличаются"});
    setIsEditMode(false)
  }
  function handleEditClick() {setIsEditMode(true)}
  function handleLogout() {props.onLogout()}

  function checkValidity(evt) {
    if(name.current.value === currentUser.name && email.current.value === currentUser.email) {
      setDifferentError({isError: true, message: "Данные не отличаются"});
      return;
    }

    if(evt.target.name === "name"){
      if(name.current.value.length === 0) {setNameError({isError: true, message: "Имя — обязательное поле"}); return}
      if(name.current.value.length > 30) {setNameError({isError: true, message: "Имя больше 30 знаков"}); return}
      if(name.current.value.length < 2) {setNameError({isError: true, message: "Имя меньше 2 знаков"}); return}
    }

    if(evt.target.name === "email"){
      const regEmail = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{1,4})$/;
      if(email.current.value.length === 0) {setEmailError({isError: true, message: "Почта — обязательное поле"}); return}
      if(!regEmail.test(email.current.value)) {setEmailError({isError: true, message: "Почта невалидна"}); return}
    }

    setNameError({isError: false, message: "Имя валидно"});
    setEmailError({isError: false, message: "Почта валидна"});
    setDifferentError({isError: false, message: "Данные отличаются"});
  }

  function handleEscape(evt) {
    if(evt.key === 'Escape'){
      setNameDefaultValue(currentUser.name);
      setEmailDefaultValue(currentUser.email);
      setNameError({isError: false, message: "Имя валидно"});
      setEmailError({isError: false, message: "Почта валидна"});
      setDifferentError({isError: true, message: "Данные не отличаются"});
      setIsEditMode(false);
      window.removeEventListener('keyup', handleEscape)
    }
  }

  React.useEffect(() => {
    setNameDefaultValue(currentUser.name);
    setEmailDefaultValue(currentUser.email);
  }, [currentUser])

  React.useEffect(() => {
    if(isEditMode) window.addEventListener('keyup', handleEscape)
  }, [isEditMode])

  return (
    <section className="profile">
      <div className="profile__content">
        <div>
          <p className="profile__greeting">Привет, {currentUser.name}!</p>
          <form className="profile__info" name="profile">
            <div className="profile__row">
              <label className="profile__row-name">Имя</label>
              {!isEditMode || (
                <input
                  className={`profile__input ${nameError.isOriginal ? "profile__input" : (!nameError.isError || "profile__input_invalid")}`}
                  type="text" name="name"
                  defaultValue={nameDefaultValue}
                  onChange={checkValidity} ref={name}
                ></input>
              )}
              {isEditMode || ( <p className="profile__value">{currentUser.name}</p> )}
            </div>
            <div className="profile__row">
              <label className="profile__row-name">E-mail</label>
              {!isEditMode || (
                <input
                  className={`profile__input ${emailError.isOriginal ? "profile__input" : (!emailError.isError || "profile__input_invalid")}`}
                  type="email" name="email"
                  defaultValue={emailDefaultValue}
                  onChange={checkValidity} ref={email}
                ></input>
              )}
              {isEditMode || ( <p className="profile__value">{currentUser.email}</p> )}
            </div>
            {!isEditMode || (
              <>
                <div className="profile__input-errors">
                  <p className={`profile__input-error ${nameError.isError || "profile__input-error_valid"}`}>{nameError.message}</p>
                  <p className={`profile__input-error ${emailError.isError || "profile__input-error_valid"}`}>{emailError.message}</p>
                  <p className={`profile__input-error ${differentError.isError || "profile__input-error_valid"}`}>{differentError.message}</p>
                </div>
                <button
                  className={`profile__button-submit ${!(nameError.isError || emailError.isError || differentError.isError) || "profile__button-submit_disabled"}`}
                  type="submit" onClick={handleSubmit} disabled={(nameError.isError || emailError.isError)}
                >Подтвердить</button>
              </>
            )}
          </form>
        </div>
        {isEditMode || (
          <div className="profile__buttons">
            <span className="profile__button" href="/profile" onClick={handleEditClick}>Редактировать</span>
            <span className="profile__button profile__button_color_red" href="/profile" onClick={handleLogout}>Выйти из аккаунта</span>
          </div>
        )}
      </div>
    </section>
  )
}

export default Profile;
