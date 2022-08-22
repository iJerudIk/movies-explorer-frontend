import React from 'react';

// ---------------------------------

function Footer(props){
  return (
    <footer className="footer">
      <div className="footer__content">
        <h4 className="footer__project-title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
        <div className="footer__bottom-part">
          <p className="footer__year">&copy; 2022</p>
          <div className="footer__links">
            <a className="footer__link" href="https://practicum.yandex.ru/profile/web" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            <a className="footer__link" href="https://github.com/iJerudIk/movies-explorer-frontend" target="_blank" rel="noreferrer">Github</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
