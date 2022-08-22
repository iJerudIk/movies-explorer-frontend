import React from 'react';

// ---------------------------------

function NavTab(props){
  return (
    <section className="nav-tab">
      <div className="nav-tab__content">
        <div className="nav-tab__links">
          <a className="nav-tab__link" href="#about-project">О проекте</a>
          <a className="nav-tab__link" href="#technologies">Технологии</a>
          <a className="nav-tab__link" href="#about-me">Студент</a>
        </div>
      </div>
    </section>
  )
}

export default NavTab;
