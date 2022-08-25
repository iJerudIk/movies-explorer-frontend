import React from 'react';

// ---------------------------------

import Card from './Card';

// ---------------------------------

function MoviesCardList(props){
  return (
    <section className="card-list">
      <div className="card-list__content">
        <ul className="card-list__cards">
          {props.cards.map((card) => (
            <li key={card._id}><Card card={card} {...props} /></li>
          ))}
        </ul>
        {props.isSavedMovies || <div className="card-list__button-more" onClick={props.onMoreButton}>Ещё</div>}
      </div>
    </section>
  )
}

export default MoviesCardList;
