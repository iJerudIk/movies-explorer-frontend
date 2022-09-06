import React from 'react';

// ---------------------------------

import Card from './Card';
import { REBUILD_POINT_1, REBUILD_POINT_2 } from '../../../utils/constants';
import { ORIGIN_CARDS_AMOUNT } from '../../../utils/constants';
import { LOADED_CARDS_AMOUNT } from '../../../utils/constants';
import { CARDS_IN_ROW } from '../../../utils/constants';

// ---------------------------------

function MoviesCardList(props){
  const [myCards, setMyCards] = React.useState([]);
  const [displayedCards, setDisplayedCards] = React.useState([]);
  const [displayedCardsAmount, setDisplayedCardsAmount] = React.useState(0);
  const [cardsInRow, setCardsInRow] = React.useState(0);
  const [loadCardsAmount, setLoadCardsAmount] = React.useState(0);
  const [windowWidthPoint, setWindowWidthPoint] = React.useState(0);

  function handleMoreButton() {
    setDisplayedCardsAmount(displayedCardsAmount + loadCardsAmount);
    props.onMoreButton(loadCardsAmount);
  }

  React.useEffect(() => {
    if(!props.isSavedMovies){
      setMyCards(props.myCards);
      setDisplayedCards(props.cards);
      setDisplayedCardsAmount(props.cardsAmount);
    }
  }, [props, displayedCards, myCards]);

  React.useEffect(() => {
    if(!props.isSavedMovies){
      window.onresize = () => {
        if(window.innerWidth < REBUILD_POINT_2) setWindowWidthPoint(2);
        else if(window.innerWidth < REBUILD_POINT_1) setWindowWidthPoint(1);
        else if(window.innerWidth >= REBUILD_POINT_1) setWindowWidthPoint(0);
      }
    }
  }, [windowWidthPoint])

  React.useEffect(() => {
    if(!props.isSavedMovies){
      setLoadCardsAmount(LOADED_CARDS_AMOUNT[windowWidthPoint]);
      setCardsInRow(CARDS_IN_ROW[windowWidthPoint]);
      setDisplayedCardsAmount(Math.ceil(props.cardsAmount/cardsInRow) * cardsInRow);
      props.setDefaultCardsAmount(ORIGIN_CARDS_AMOUNT[windowWidthPoint]);
    }
  }, [windowWidthPoint, displayedCardsAmount, loadCardsAmount, cardsInRow])

  return (
    <section className="card-list">
      <div className="card-list__content">
        {
          props.isSavedMovies ?
          (
            <ul className="card-list__cards">
              {props.cards.map((card, i) => ( <li key={i}><Card card={card} {...props} /></li> ))}
            </ul>
          ) :
          (
            props.cards.length > 0 ?
              (
              <>
                <ul className="card-list__cards">
                  {
                    displayedCards.map((card, i) => {
                      if(i < displayedCardsAmount)
                        return (<li key={i}><Card card={card} isLiked={myCards.some((myCard) => {return card.id === myCard.movieId})} {...props} /></li> )
                    })
                  }
                </ul>
                {
                  props.cards.length - displayedCardsAmount <= 0 || props.isSavedMovies ||
                  (<div className="card-list__button-more" onClick={handleMoreButton}>Ещё</div>)
                }
              </>
            ) : (
              props.needToShowPreloader || <p className="card-list__nothing">Ничего не было найдено</p>
            )
          )
        }
      </div>
    </section>
  )
}

export default MoviesCardList;
