import React from 'react';

// ---------------------------------

import photo from '../../../images/my-photo.svg';

// ---------------------------------

function AboutMe(props){
  return (
    <section className="about-me" id="about-me">
      <div className="about-me__content">
        <div className="about-me__title-box">
          <h2 className="about-me__title">Студент</h2>
        </div>
        <div className="about-me__description">
          <img className="about-me__photo" src={photo} alt="моё фото" />
          <div className="about-me__info">
            <div>
              <h3 className="about-me__my-name">Алексей</h3>
              <h4 className="about-me__my-info">Студент факультета "Веб-разработчик", 14 лет</h4>
              <p className="about-me__my-dopinfo">Я родился и живу в Гомеле, учусь в 9 классе. У меня есть домашний кот, по кличке Бася. Я начал увлекаться кодом с 8 лет, а веб-разработкой - с 12. После того, как пройду курс Веб-разработчик, поступлю на курс Веб-разработчик Плюс</p>
            </div>
            <div className="about-me__links">
              <a className="about-me__link" href="https://vk.com/ijerudim" target="_blank" rel="noreferrer">VK</a>
              <a className="about-me__link" href="https://github.com/iJerudIk" target="_blank" rel="noreferrer">Github</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe;
