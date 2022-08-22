import React from 'react';

// ---------------------------------

import Promo from './Promo';
import NavTab from './NavTab';
import AboutProject from './AboutProject';
import Techs from './Techs';
import AboutMe from './AboutMe';
import Portfolio from './Portfolio';

// ---------------------------------

function Main(props){
  return (
    <>
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </>
  )
}

export default Main;
