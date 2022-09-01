import React from 'react';

// ---------------------------------

import Card from './Card';

// ---------------------------------

function MoviesCardList(props){
  const [displayedCards, setDisplayedCards] = React.useState([]);
  const [displayedCardsAmount, setDisplayedCardsAmount] = React.useState(0);
  const [loadCardsAmount, setLoadCardsAmount] = React.useState(0);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  function handleMoreButton() {
    setDisplayedCardsAmount(displayedCardsAmount + loadCardsAmount);
    props.onMoreButton(loadCardsAmount);
  }

  window.onresize = () => {setWindowWidth(window.innerWidth)}

  React.useEffect(() => {
    setDisplayedCards(props.cards);
    setDisplayedCardsAmount(props.cardsAmount);
  }, [props.cards]);

  React.useEffect(() => {
    if(windowWidth >= 1088){
      setLoadCardsAmount(3);
      props.setDefaultCardsAmount(12);
    }
    if(windowWidth < 1088){
      setLoadCardsAmount(2);
      props.setDefaultCardsAmount(8);
    }
    if(windowWidth < 550){
      setLoadCardsAmount(2);
      props.setDefaultCardsAmount(5);
    }
  }, [windowWidth])

  return (
    <section className="card-list">
      <div className="card-list__content">
        <ul className="card-list__cards">
          {props.isSavedMovies ?
            (props.cards.map((card, i) => ( <li key={i}><Card card={card} {...props} /></li> ))) :
            (displayedCards.map((card, i) => {
              if(i < displayedCardsAmount)
                return ( <li key={i}><Card card={card} {...props} /></li> );
            }))
          }
        </ul>
        {
          (props.cards.length - displayedCardsAmount < 3 || props.isSavedMovies) ||
          <div className="card-list__button-more" onClick={handleMoreButton}>Ещё</div>
        }
      </div>
    </section>
  )
}

export default MoviesCardList;
