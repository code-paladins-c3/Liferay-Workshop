import React from 'react';

const Welcome = () => {
  return (
    <div className="container">
      <div className="welcomeBoard">
        <img src="https://media.istockphoto.com/id/626132614/pt/foto/blue-fronted-redstart-the-beautiful-blue.jpg?s=1024x1024&w=is&k=20&c=WuZk5dRfpAPbponj8oYAlSf1Q07BOYn2tbTOF5h0AIM=" alt="" id="backgroundWelcome" />
      </div>
      <div className="welcomePhrase">
        <h1>Welcome to <span>Liferay</span></h1>
      </div>
    </div>
  );
};

export default Welcome;