import React from 'react';

// ---------------------------------

import link from '../../../images/link.svg';

// ---------------------------------

function Portfolio(props){
  return (
    <section className="portfolio">
      <div className="portfolio__content">
        <h2 className="portfolio__title">Портфолио</h2>
        <div className="portfolio__links">
          <a className="portfolio__link" href="/">Статичный сайт<img src={link} alt="стрелка-сслыка" /></a>
          <a className="portfolio__link" href="/">Адаптивный сайт<img src={link} alt="стрелка-сслыка" /></a>
          <a className="portfolio__link" href="/">Одностраничное приложение<img src={link} alt="стрелка-сслыка" /></a>
        </div>
      </div>
    </section>
  )
}

export default Portfolio;
