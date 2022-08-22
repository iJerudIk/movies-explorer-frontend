import React from 'react';

// ---------------------------------

function Techs(props){
  return (
    <section className="technologies"  id="technologies">
      <div className="technologies__content">
        <div className="technologies__title-box">
          <h2 className="technologies__title">Технологии</h2>
        </div>
        <h3 className="technologies__count">7 технологий</h3>
        <p className="technologies__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className="technologies__techs">
          <a className="technologies__tech" href="https://ru.wikipedia.org/wiki/HTML" target="_blank" rel="noreferrer">HTML</a>
          <a className="technologies__tech" href="https://ru.wikipedia.org/wiki/CSS" target="_blank" rel="noreferrer">CSS</a>
          <a className="technologies__tech" href="https://ru.wikipedia.org/wiki/JavaScript" target="_blank" rel="noreferrer">JS</a>
          <a className="technologies__tech" href="https://ru.wikipedia.org/wiki/React" target="_blank" rel="noreferrer">React</a>
          <a className="technologies__tech" href="https://ru.wikipedia.org/wiki/Git" target="_blank" rel="noreferrer">Git</a>
          <a className="technologies__tech" href="https://ru.wikipedia.org/wiki/Express_(%D1%84%D1%80%D0%B5%D0%B9%D0%BC%D0%B2%D0%BE%D1%80%D0%BA)" target="_blank" rel="noreferrer">Express.js</a>
          <a className="technologies__tech" href="https://ru.wikipedia.org/wiki/MongoDB" target="_blank" rel="noreferrer">mongoDB</a>
        </div>
      </div>
    </section>
  )
}

export default Techs;
