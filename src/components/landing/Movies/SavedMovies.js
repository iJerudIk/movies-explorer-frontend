import React from 'react';

// ---------------------------------

import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';

// ---------------------------------

function SavedMovies(props){
  return (
    <>
      <SearchForm
        onSubmitSearchForm={props.onSubmitSearchForm}
        isSavedMovies={true}
        searchInputValue={props.searchInputValue}
        searchCheckboxValue={props.searchCheckboxValue}
      />
      <MoviesCardList isSavedMovies={true} {...props} />
    </>
  )
}

export default SavedMovies;
