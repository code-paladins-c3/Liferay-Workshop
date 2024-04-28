
import './App.css';

import React from 'react';  
import FirstAccess from './utils/pages/FirstAccess/FirstAsccess.js';
import EventCreate from './utils/pages/EventCreate/EventCreate.js';

function App(props) {
  return (
    <div className="App">
    <FirstAccess />
    <EventCreate />
    </div>
  );
}

export default App;