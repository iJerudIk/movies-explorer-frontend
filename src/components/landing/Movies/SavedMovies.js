import React from 'react';

// ---------------------------------

import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';

// ---------------------------------

function SavedMovies(props){
  return (
    <>
      <SearchForm onSubmitSearchForm={props.onSubmitSearchForm} />
      <MoviesCardList isSavedMovies={true} {...props} />
    </>
  )
}

export default SavedMovies;
