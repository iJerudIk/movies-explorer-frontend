import React from 'react';
import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';

// ---------------------------------

import * as auth from '../utils/auth.js';

import ProtectedRoute from './landing/ProtectedRoute';
import Header from './landing/Header';
import Navigation from './landing/Navigation';
import Footer from './landing/Footer';
import ErrorMessage from './landing/ErrorMessage';
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

import { SHORTCUT_DURATION } from '../utils/constants';

// ---------------------------------

function App() {
  const history = useHistory();

  const [loggedIn, setLogged] = React.useState(false);
  const [needToShowHeader, setNeedToShowHeader] = React.useState(true);
  const [needToShowFooter, setNeedToShowFooter] = React.useState(true);
  const [needToShowPreloader, setNeedToShowPreloader] = React.useState(false);
  const [needtoProtectRoutes, setNeedToProtectRoutes] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState({message: '', number: 0});

  const [currentUser, setCurrentUser] = React.useState({});

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [allCards, setAllCards] = React.useState([]);
  const [myCards, setMyCards] = React.useState([]);

  const [allDisplayedCards, setAllDisplayedCards] = React.useState({isDisplayed: false, cards: []});
  const [allDisplayedCardsAmount, setAllDisplayedCardsAmount] = React.useState(0);
  const [originCardsAmount, setOriginCardsAmount] = React.useState(0);
  const [allCardsSearchInputValue, setAllCardsSearchInputValue] = React.useState('');
  const [allCardsSearchCheckboxValue, setAllCardsSearchCheckboxValue] = React.useState(false);
  const [myDisplayedCards, setMyDisplayedCards] = React.useState({isDisplayed: false, cards: []});

  // ---------------------------------

  function handleCardDelete(card) {
    mainApi.removeMyMovie(card._id)
    .catch((err) => {
      console.log(`Ошибка : ${err}`);
      setErrorMessage({message: `Не удалось удалить фильм  ${err}`, number: errorMessage.number+1});
    })

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
      .catch((err) => {
        console.log(`Ошибка : ${err}`);
        setErrorMessage({message: `Не удалось поставить лайк  ${err}`, number: errorMessage.number+1});
      })
  }
  function findMovies(cards, isSavedMovies, inputValue, isShortcut) {
    let cardsToShow = cards.filter((card) => {
      return (
        (String(card.nameEN).toLowerCase().includes(inputValue.toLowerCase()) && card.nameEN !== null) ||
        (String(card.nameRU).toLowerCase().includes(inputValue.toLowerCase()) && card.nameRU !== null)
      )
    });
    if(isShortcut) {
      cardsToShow = cardsToShow.filter((card) => {return card.duration <= SHORTCUT_DURATION});
    }

    if(!isSavedMovies) {
      setAllCardsSearchCheckboxValue(isShortcut);
      setAllCardsSearchInputValue(inputValue);
      setAllDisplayedCards({isDisplayed: true, cards: cardsToShow});
      setAllDisplayedCardsAmount(originCardsAmount);

      localStorage.setItem('displayedCardsInfo', JSON.stringify({
        cardsSearchCheckboxValue: isShortcut,
        cardsSearchInputValue: inputValue,
        isDisplayedCardsDisplayed: true,
        displayedCards: cardsToShow,
        displayedCardsAmount: originCardsAmount
      }));
    } else {
      setMyDisplayedCards({isDisplayed: true, cards: cardsToShow});
    }
  }
  function handleSubmitSearchForm(isSavedMovies, inputValue, isShortcut) {
    if(isSavedMovies) findMovies(myCards, isSavedMovies, inputValue, isShortcut)
    else {
      if(allCards.length > 0) findMovies(allCards, isSavedMovies, inputValue, isShortcut);
      else {
        setNeedToShowPreloader(true);
        moviesApi.getAllMovies()
          .then((cards) => {
            setAllCards(cards);
            findMovies(cards, isSavedMovies, inputValue, isShortcut);
            setNeedToShowPreloader(false);
          })
          .catch((err) => {
            console.log(`Ошибка : ${err}`);
            setNeedToShowPreloader(false);
            setErrorMessage({message: `Не удалось загрузить фильмы  ${err}`, number: errorMessage.number+1});
          })
      }
    }
  }
  function handleMoreButton(loadedAmount) {
    setAllDisplayedCardsAmount(allDisplayedCardsAmount + loadedAmount);
    localStorage.setItem('displayedCardsInfo', JSON.stringify({
      ...JSON.parse(localStorage.getItem('displayedCardsInfo')),
      displayedCardsAmount: allDisplayedCardsAmount + loadedAmount
    }));
  }
  function changeOriginCardsAmount(amount) {setOriginCardsAmount(amount)}

  // ---------------------------------

  function handleSubmitEditProfile(name, email) {
    mainApi.setUserInfo({name, email})
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setErrorMessage(`Профиль успешно изменён`);
        setErrorMessage({message: `Профиль успешно изменён`, number: errorMessage.number+1});
      })
      .catch((err) => {
        console.log(`Ошибка : ${err}`);
        setErrorMessage({message: `Не удалось изменить ваши данные. ${err}`, number: errorMessage.number+1});
      })
  }
  function handleLogout() {
    mainApi.deleteToken();
    localStorage.clear();
    setAllDisplayedCards({isDisplayed: false, cards: []});
    setAllDisplayedCardsAmount(0);
    setAllCardsSearchInputValue('');
    setAllCardsSearchCheckboxValue(false);
    setLogged(false);
  }

  // ---------------------------------

  function handleRegister(name, email, password) {
    auth.register(name, email, password)
      .then((res) => handleLogin(email, password))
      .catch((err) => {
        console.log(`Ошибка : ${err}`);
        setErrorMessage({message: `Не удалось зарегестрироваться  ${err}`, number: errorMessage.number+1});
      })
  }
  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        if(res.token){
          localStorage.setItem('token', res.token);
          setLogged(true);
          history.push('/movies');
        }
      })
      .catch((err) => {
        console.log(`Ошибка : ${err}`);
        setErrorMessage({message: `Не удалось авторизоваться. ${err}`, number: errorMessage.number+1});
      })
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
    setMyDisplayedCards({isDisplayed: false, cards: []})
  }, [location]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      mainApi.setToken(token);

      mainApi.getUserInfo()
        .then((userInfo) => {
          if(userInfo) {
            setCurrentUser(userInfo);
            setLogged(true);
          }
        })
        .catch((err) => {
          console.log(`Ошибка : ${err}`);
          if(err === 'Ошибка 401'){
            mainApi.deleteToken();
            localStorage.removeItem('token');
            setLogged(false);
            setNeedToProtectRoutes(true);
            history.push('/signin');
          }
        })

      if(loggedIn){
        mainApi.getUserInfo()
          .then((userInfo) => setCurrentUser(userInfo))
          .catch((err) => {
            console.log(`Ошибка : ${err}`);
            setErrorMessage({message: `Не удалось загрузить ваши данные  ${err}`, number: errorMessage.number+1});
          })
        mainApi.getMyMovies()
          .then((cards) => {
            setMyCards(cards);
            const displayedCardsInfo = JSON.parse(localStorage.getItem('displayedCardsInfo'));
            if(displayedCardsInfo) {
              setAllCardsSearchCheckboxValue(displayedCardsInfo.cardsSearchCheckboxValue);
              setAllCardsSearchInputValue(displayedCardsInfo.cardsSearchInputValue);
              setAllDisplayedCards({isDisplayed: displayedCardsInfo.isDisplayedCardsDisplayed, cards: displayedCardsInfo.displayedCards});
              setAllDisplayedCardsAmount(displayedCardsInfo.displayedCardsAmount);
              setNeedToProtectRoutes(true);
            }
          })
          .catch((err) => {
            console.log(`Ошибка : ${err}`);
            setErrorMessage({message: `Не удалось загрузить ваши фильмы  ${err}`, number: errorMessage.number+1});
          })
      }
    } else {
      mainApi.deleteToken();
      setNeedToProtectRoutes(true);
    }
  }, [history, loggedIn]);

  // ---------------------------------

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {!needToShowHeader || ( <Header loggedIn={loggedIn} onMenuClick={openMenu}></Header> )}
        {!needToShowHeader || ( <Navigation isOpen={isMenuOpen} onCrossClick={closeMenu}></Navigation> )}
        <ErrorMessage message={errorMessage.message} messageNumber={errorMessage.number} />

        <main>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>

            <Route exact path="/movies">
              <ProtectedRoute
                loggedIn={loggedIn}
                needToProtect={needtoProtectRoutes}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onSubmitSearchForm={handleSubmitSearchForm}
                onMoreButton={handleMoreButton}
                needToShowPreloader={needToShowPreloader}
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
                needToProtect={needtoProtectRoutes}
                onCardDelete={handleCardDelete}
                onSubmitSearchForm={handleSubmitSearchForm}
                cards={myDisplayedCards.isDisplayed ? myDisplayedCards.cards : myCards}
                component={SavedMovies}
              />
            </Route>

            <Route exact path="/profile">
              <ProtectedRoute
                loggedIn={loggedIn}
                needToProtect={needtoProtectRoutes}
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

            <Route path="*">
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
