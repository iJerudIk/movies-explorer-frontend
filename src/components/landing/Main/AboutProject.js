import React from 'react';

// ---------------------------------

function AboutProject(props){
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__content">
        <div className="about-project__title-box">
          <h2 className="about-project__title">О проекте</h2>
        </div>
        <div className="about-project__description">
          <div className="about-project__description-block">
            <h3 className="about-project__description-title">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__description-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="about-project__description-block">
            <h3 className="about-project__description-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__description-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="about-project__timeline">
          <div className="about-project__stage">
            <p className="about-project__stage-time about-project__stage-time_theme_dark">1 неделя</p>
            <p className="about-project__stage-name">Back-end</p>
          </div>
          <div className="about-project__stage">
            <p className="about-project__stage-time ">4 недели</p>
            <p className="about-project__stage-name">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;
