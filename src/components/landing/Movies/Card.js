import React from 'react';

// ---------------------------------

import cross from '../../../images/delete-card.svg';
import markActive from '../../../images/mark-active.svg';
import markInactive from '../../../images/mark-inactive.svg';

// ---------------------------------

function Card(props){
  const [isLiked, setIsLiked] = React.useState(
    props.isSavedMovies || props.myCards.some((card) => {return card.nameEN === props.card.nameEN})
  );

  const hours = Math.floor(props.card.duration/60);
  const minutes = props.card.duration - hours*60;

  function onMarkClick() {
    if(isLiked){
      props.myCards.forEach((card) => {
        if(card.nameEN === props.card.nameEN) props.onCardDelete(card);;
      });
      setIsLiked(false);
    }
    else{
      props.onCardLike(props.card);
      setIsLiked(true);
    }
  }

  function handleCardDelete() {props.onCardDelete(props.card)}

  return (
    <div className="card-list__card">
      <div className="card-list__card-top-part">
        <div className="card-list__card-info">
          <h5 className="card-list__card-title">{props.card.nameRU || props.card.nameEN}</h5>
          <p className="card-list__card-duration">{ `${hours}ч ${minutes}м`}</p>
        </div>
        {
          props.isSavedMovies ?
            (
              <button className="card-list__card-mark" onClick={handleCardDelete}><img src={cross} alt="крестик" /></button>
            ) :
            (
              <button className={`card-list__card-mark ${isLiked || "card-list__card-mark_inactive"}`} onClick={onMarkClick}>
                <img src={isLiked ? markActive : markInactive} alt="закладка" />
              </button>
            )
        }
      </div>
      <div className="card-list__card-image" style={{backgroundImage: `url(${props.isSavedMovies ? props.card.image : 'https://api.nomoreparties.co'+props.card.image.url})`}}></div>
    </div>
  )
}

export default Card;
