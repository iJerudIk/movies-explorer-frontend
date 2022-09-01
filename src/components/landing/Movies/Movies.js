import React from 'react';

// ---------------------------------

import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';

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
    </>
  )
}

export default Movies;
