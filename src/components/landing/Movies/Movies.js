import React from 'react';

// ---------------------------------

import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import Preloader from '../Preloader';

// ---------------------------------

function Movies(props){
  return (
    <>
      <SearchForm
        onSubmitSearchForm={props.onSubmitSearchForm}
        isSavedMovies={false}
        searchInputValue={props.searchInputValue}
        searchCheckboxValue={props.searchCheckboxValue}
      />
      <MoviesCardList isSavedMovies={false} {...props} />
      {!props.needToShowPreloader || <Preloader />}
    </>
  )
}

export default Movies;
