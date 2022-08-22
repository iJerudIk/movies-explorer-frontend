import React from 'react';

// ---------------------------------

function Profile(props){
  const [isEditMode, setIsEditMode] = React.useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmitEdition();
    setIsEditMode(false);
  }
  function handleEditClick() {setIsEditMode(true)}
  function handleLogout() {props.onLogout()}

  return (
    <section className="profile">
      <div className="profile__content">
        <div>
          <p className="profile__greeting">Привет, {"Виталий"}!</p>
          <form className="profile__info">
            <div className="profile__row">
              <label className="profile__row-name">Имя</label>
              {!isEditMode || ( <input className="profile__input profile__input_content_name" type="text" defaultValue={"Виталий"}></input> )}
              {isEditMode || ( <p className="profile__value">{"Виталий"}</p> )}
            </div>
            <div className="profile__row">
              <label className="profile__row-name">E-mail</label>
              {!isEditMode || ( <input className="profile__input profile__input_content_email" type="text" defaultValue={"pochta@gmail.com"}></input> )}
              {isEditMode || ( <p className="profile__value">{"pochta@gmail.com"}</p> )}
            </div>
            {!isEditMode || (
              <>
                <div className="profile__input-errors">
                  <p className="profile__input-error profile__input-error_content_name profile__input-error_valid">Имя валидно</p>
                  <p className="profile__input-error profile__input-error_content_email">Почта невалидна</p>
                </div>
                <button className="profile__button-submit" type="submit" onClick={handleSubmit}>Подтвердить</button>
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
