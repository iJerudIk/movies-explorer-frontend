import React from 'react';

// ---------------------------------

function ErrorMessage(props){
  const [className, setClassName] = React.useState('');
  const [isAtFirst, setIsAtFirst] = React.useState(true)

  React.useEffect(() => {
    if(!isAtFirst){
      setClassName('error-message_active');
      setTimeout(() => {
        setClassName('');
      }, 3000);
    } else {
      setIsAtFirst(false);
    }
  }, [props.message])

  return (
    <div className={`error-message ${className}`}>
      <p className="error-message__message">{props.message}</p>
      <div className="error-message__time"><div className="error-message__time-upper"></div></div>
    </div>
  )
}

export default ErrorMessage;
