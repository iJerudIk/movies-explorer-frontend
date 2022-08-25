import React from 'react';

// ---------------------------------

import cross from '../../../images/delete-card.svg';
import markActive from '../../../images/mark-active.svg';
import markInactive from '../../../images/mark-inactive.svg';

// ---------------------------------

function Card(props){
  const [isLiked, setIsLiked] = React.useState(props.card.isLiked);

  const hours = Math.floor(props.card.duration/60);
  const minutes = props.card.duration - hours*60;

  function onMarkClick() {
    props.onCardLike(props.card);
    if(isLiked) setIsLiked(false);
    else setIsLiked(true);
  }

  function handleCardDelete() {props.onCardDelete(props.card)}

  return (
    <div className="card-list__card">
      <div className="card-list__card-top-part">
        <div>
          <h5 className="card-list__card-title">{props.card.nameRU}</h5>
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
      <div className="card-list__card-image" style={{backgroundImage: `url(${props.card.image})`}}></div>
    </div>
  )
}

export default Card;
