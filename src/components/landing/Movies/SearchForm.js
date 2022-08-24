import React from 'react';

// ---------------------------------

import loupe from '../../../images/loupe.svg';
import enter from '../../../images/enter.svg';

// ---------------------------------

function SearchForm(props){
  const [isShortFilm, setIsShortFilm] = React.useState(false);

  function handleCheckboxClick() {setIsShortFilm(!isShortFilm)}
  function handleSubmit(evt) {
    evt.preventDefault()
    // -
    props.onSubmitSearchForm();
  }

  return (
    <section className="search-form">
      <div className="search-form__content">
        <form className="search-form__form">
          <div className="search-form__window">
            <img className="search-form__loupe" src={loupe} alt="лупа" />
            <input className="search-form__input" type="text" name="movie" placeholder="Фильм" required></input>
            <button className="search-form__button-submit" type="submit" onClick={handleSubmit}>
              <img src={enter} alt="ввод" />
            </button>
          </div>
          <div className="search-form__checkbox">
            <div className={`search-form__checkbox-input ${!isShortFilm || "search-form__checkbox-input_active"}`} onClick={handleCheckboxClick}>
              <div className="search-form__checkbox-circle"></div>
            </div>
            <p className="search-form__checkbox-name">Короткометражки</p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default SearchForm;
