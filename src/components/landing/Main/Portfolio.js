import React from 'react';

// ---------------------------------

import link from '../../../images/link.svg';

// ---------------------------------

function Portfolio(props){
  return (
    <section className="portfolio">
      <div className="portfolio__content">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__links">
          <li><a className="portfolio__link" href="https://doesntmatter.nomoredomains.xyz" target="_blank" rel="noreferrer">Статичный сайт<img src={link} alt="стрелка-сслыка" /></a></li>
          <li><a className="portfolio__link" href="https://doesntmatter.nomoredomains.xyz" target="_blank" rel="noreferrer">Адаптивный сайт<img src={link} alt="стрелка-сслыка" /></a></li>
          <li><a className="portfolio__link" href="https://doesntmatter.nomoredomains.xyz" target="_blank" rel="noreferrer">Одностраничное приложение<img src={link} alt="стрелка-сслыка" /></a></li>
        </ul>
      </div>
    </section>
  )
}

export default Portfolio;
