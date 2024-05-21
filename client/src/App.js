import React from 'react';  

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstAccess from './utils/pages/FirstAccess/FirstAsccess.js';
import EventCreate from './utils/pages/EventCreate/EventCreate.js';
import AllEvents from './utils/pages/EventPageAll/AllEvents.js';
import Login from './utils/pages/Login/login.js';
import Main from './utils/pages/main/main.js';



function App(props) {
  return (
    <Router>
      <div className="App">
      <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/firstaccess" element={<FirstAccess />} />
          <Route path="/eventcreate" element={<EventCreate />} />
          <Route path="/allevents" element={<AllEvents />} />
          <Route path="/Main" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;