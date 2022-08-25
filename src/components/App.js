import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

// ---------------------------------

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

import { allMovies, myMovies } from '../utils/constants';

// ---------------------------------

function App() {
  const [loggedIn, setLogged] = React.useState(true);
  const [needToShowHeader, setNeedToShowHeader] = React.useState(true);
  const [needToShowFooter, setNeedToShowFooter] = React.useState(true);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const allCards = allMovies;
  const [myCards, setMyCards] = React.useState(myMovies);

  function handleCardDelete(card) {
    setMyCards(state=>state.filter((c) => {return c._id !== card._id}));
  }

  function handleMoreButton() {}
  function handleCardLike() {}
  function handleSubmitSearchForm() {}

  function handleSubmitEditProfile() {}
  function handleLogout() {
    // -
    setLogged(false);
  }

  function handleRegister() {}
  function handleLogin() {}

  function openMenu() {setIsMenuOpen(true)}
  function closeMenu() {setIsMenuOpen(false)}

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

  return (
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
              onMoreButton={handleMoreButton}
              onCardLike={handleCardLike}
              onSubmitSearchForm={handleSubmitSearchForm}
              cards={allCards}
              component={Movies}
            />
          </Route>

          <Route exact path="/saved-movies">
            <ProtectedRoute
              loggedIn={loggedIn}
              onCardDelete={handleCardDelete}
              onSubmitSearchForm={handleSubmitSearchForm}
              cards={myCards}
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

          <Route path="/">
            <NotFound />
          </Route>
        </Switch>

        {true || ( <Preloader /> )}
      </main>

      {!needToShowFooter || ( <Footer></Footer> )}
    </div>
  )
}

export default App;
