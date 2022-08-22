import React from 'react';

// ---------------------------------

import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';

// ---------------------------------

function Movies(props){
  return (
    <>
      <SearchForm onSubmitSearchForm={props.onSubmitSearchForm} />
      <MoviesCardList isSavedMovies={false} {...props} />
    </>
  )
}

export default Movies;
