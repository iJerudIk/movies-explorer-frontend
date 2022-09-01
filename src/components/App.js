import React from 'react';
import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';

// ---------------------------------

import * as auth from '../utils/auth.js';

import ProtectedRoute from './landing/ProtectedRoute';
import Header from './landing/Header';
import Navigation from './landing/Navigation';
import Footer from './landing/Footer';
import Preloader from './landing/Preloader';
import Main from './landing/Main/Main';
import Movies from './landing/Movies/Movies';
import SavedMovies from './landing/Movies/SavedMovies';
import Profile from './landing/Profile/Profile';
import Login from './landing/Auth/Login';
import Register from './landing/Auth/Register';
import NotFound from './landing/NotFound';

import { mainApi } from '../utils/Apies/MainApi.js';
import { moviesApi } from '../utils/Apies/MoviesApi.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

// ---------------------------------

function App() {
  const history = useHistory();

  const [loggedIn, setLogged] = React.useState(false);
  const [needToShowHeader, setNeedToShowHeader] = React.useState(true);
  const [needToShowFooter, setNeedToShowFooter] = React.useState(true);

  const [currentUser, setCurrentUser] = React.useState({});

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [allCards, setAllCards] = React.useState([]);
  const [myCards, setMyCards] = React.useState([]);

  const [allDisplayedCards, setAllDisplayedCards] = React.useState({isDisplayed: false, cards: []});
  const [myDisplayedCards, setMyDisplayedCards] = React.useState({isDisplayed: false, cards: []});
  const [allDisplayedCardsAmount, setAllDisplayedCardsAmount] = React.useState(0);
  const [originCardsAmount, setOriginCardsAmount] = React.useState(0);
  const [allCardsSearchInputValue, setAllCardsSearchInputValue] = React.useState('');
  const [myCardsSearchInputValue, setMyCardsSearchInputValue] = React.useState('');
  const [allCardsSearchCheckboxValue, setAllCardsSearchCheckboxValue] = React.useState(false);
  const [myCardsSearchCheckboxValue, setMyCardsSearchCheckboxValue] = React.useState(false);

  // ---------------------------------

  function handleCardDelete(card) {
    mainApi.removeMyMovie(card._id)
      .catch((err) => console.log(`Ошибка : ${err}`));

    setMyCards(state=>state.filter((c) => {return c._id !== card._id}));
    setMyDisplayedCards({isDisplayed: myDisplayedCards.isDisplayed, cards: myDisplayedCards.cards.filter((c) => {return c._id !== card._id})});
  }

  // ---------------------------------

  function handleCardLike(card) {
    const movie = {
      country: card.country || "UK",
      director: card.director || "Unknown",
      duration: card.duration || 60,
      year: card.year || 2015,
      description: card.description || "No",
      trailerLink: card.trailerLink,
      movieId: card.id,
      nameRU: card.nameRU || "",
      nameEN: card.nameEN || "",
      image: "https://api.nomoreparties.co"+card.image.url,
      thumbnail: "https://api.nomoreparties.co"+card.image.formats.thumbnail.url ||
        "https://img.freepik.com/premium-vector/modern-minimal-not-found-error-icon-oops-page-not-found-404-error-the-page-not-found-with-concept_599740-716.jpg?w=2000",
    }; // Какой-то кривой этот Api. Он может что-то не вернуть

    mainApi.addMyMovie(movie)
      .then((newMovie) => {
        const newMyCards = myCards;
        newMyCards.push(newMovie);
        setMyCards(newMyCards);
      })
      .catch((err) => console.log(`Ошибка : ${err}`));
  }
  function handleSubmitSearchForm(isSavedMovies, inputValue, isShortcut) {
    const cards = isSavedMovies ? myCards : allCards;
    let cardsToShow = cards.filter((card) => {
      return (
        (String(card.nameEN).toLowerCase().includes(inputValue.toLowerCase()) && card.nameEN !== null) ||
        (String(card.nameRU).toLowerCase().includes(inputValue.toLowerCase()) && card.nameRU !== null)
      )
    });
    if(isShortcut) {
      cardsToShow = cardsToShow.filter((card) => {return card.duration <= 40});
    }

    if(isSavedMovies) {
      setMyCardsSearchCheckboxValue(isShortcut);
      setMyCardsSearchInputValue(inputValue);
      setMyDisplayedCards({isDisplayed: true, cards: cardsToShow});
    } else {
      setAllCardsSearchCheckboxValue(isShortcut);
      setAllCardsSearchInputValue(inputValue);
      setAllDisplayedCards({isDisplayed: true, cards: cardsToShow});
      setAllDisplayedCardsAmount(originCardsAmount);
    }
  }
  function handleMoreButton(loadedAmount) {setAllDisplayedCardsAmount(allDisplayedCardsAmount + loadedAmount)}
  function changeOriginCardsAmount(amount) {setOriginCardsAmount(amount)}

  // ---------------------------------

  function handleSubmitEditProfile(name, email) {
    mainApi.setUserInfo({name, email})
      .then((userInfo) => {setCurrentUser(userInfo)})
  }
  function handleLogout() {
    mainApi.deleteToken();
    localStorage.removeItem('token');
    setLogged(false);
  }

  // ---------------------------------

  function handleRegister(name, email, password) {
    auth.register(name, email, password)
      .then((res) => {
        if(res){
          history.push('/signin');
        }
      })
      .catch((err) => console.log(`Ошибка : ${err}`));
  }
  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        if(res.token){
          localStorage.setItem('token', res.token);
          setLogged(true);
        }
      })
      .catch((err) => console.log(`Ошибка : ${err}`));
  }

  // ---------------------------------

  function openMenu() {setIsMenuOpen(true)}
  function closeMenu() {setIsMenuOpen(false)}

  // ---------------------------------

  const location = useLocation().pathname;
  React.useEffect(() => {
    const routes = ["/", "/movies", "/saved-movies", "/profile", "/signin", "/signup"];
    if(!routes.some(function(route) { return location === route || location === route+"/" })) {
      setNeedToShowHeader(false);
      setNeedToShowFooter(false);
    } else {
      if(location === "/signin" || location === "/signup") {
        setNeedToShowHeader(false);
        setNeedToShowFooter(false);
      }
      else {
        setNeedToShowHeader(true);
        if(location === "/profile") setNeedToShowFooter(false);
        else setNeedToShowFooter(true);
      }
    }
  }, [location]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      history.push('/preloader');
      mainApi.setToken(token);

      if(loggedIn){
        mainApi.getUserInfo()
          .then((userInfo) => setCurrentUser(userInfo))
        mainApi.getMyMovies()
          .then((cards) => setMyCards(cards))
          .then(() => {
            moviesApi.getAllMovies()
              .then((cards) => {
                setAllCards(cards);
                history.push('/movies');
              })
              .catch((err) => console.log(`Ошибка : ${err}`))
          })
          .catch((err) => console.log(`Ошибка : ${err}`))
      }
      else {
        mainApi.getUserInfo()
          .then((userInfo) => {
            if(userInfo) setLogged(true);
          })
          .catch((err) => console.log(`Ошибка : ${err}`))
      }
    } else {
      history.push('/');
      mainApi.deleteToken();
    }
  }, [loggedIn, history]);

  // ---------------------------------

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {!needToShowHeader || ( <Header loggedIn={loggedIn} onMenuClick={openMenu}></Header> )}
        {!needToShowHeader || ( <Navigation isOpen={isMenuOpen} onCrossClick={closeMenu}></Navigation> )}

        <main>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>

            <Route exact path="/movies">
              <ProtectedRoute
                loggedIn={loggedIn}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onSubmitSearchForm={handleSubmitSearchForm}
                onMoreButton={handleMoreButton}
                searchInputValue={allCardsSearchInputValue}
                searchCheckboxValue={allCardsSearchCheckboxValue}
                cards={allDisplayedCards.cards}
                cardsAmount={allDisplayedCardsAmount}
                setDefaultCardsAmount={changeOriginCardsAmount}
                myCards={myCards}
                component={Movies}
              />
            </Route>

            <Route exact path="/saved-movies">
              <ProtectedRoute
                loggedIn={loggedIn}
                onCardDelete={handleCardDelete}
                onSubmitSearchForm={handleSubmitSearchForm}
                searchInputValue={myCardsSearchInputValue}
                searchCheckboxValue={myCardsSearchCheckboxValue}
                cards={myDisplayedCards.isDisplayed ? myDisplayedCards.cards : myCards}
                component={SavedMovies}
              />
            </Route>

            <Route exact path="/profile">
              <ProtectedRoute
                loggedIn={loggedIn}
                onSubmitEdition={handleSubmitEditProfile}
                onLogout={handleLogout}
                component={Profile}
              />
            </Route>

            <Route exact path="/signin">
              {loggedIn ? ( <Redirect to="/" /> ) : ( <Login onLogin={handleLogin} /> )}
            </Route>

            <Route exact path="/signup">
              {loggedIn ? ( <Redirect to="/" /> ) : ( <Register onRegister={handleRegister} /> )}
            </Route>

            <Route exact path="/preloader">
              <Preloader />
            </Route>

            <Route path="/">
              <NotFound />
            </Route>
          </Switch>
        </main>

        {!needToShowFooter || ( <Footer></Footer> )}
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
