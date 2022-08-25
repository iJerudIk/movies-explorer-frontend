import React from 'react';
import { useHistory } from 'react-router-dom';

// ---------------------------------

function NotFound(props){
  const history = useHistory();

  return (
    <section className="not-found">
      <div className="not-found__main">
        <p className="not-found__status">404</p>
        <p className="not-found__message">Страница не найдена</p>
      </div>
      <span className="not-found__back" href="#" onClick={history.goBack}>Назад</span>
    </section>
  )
}

export default NotFound;
