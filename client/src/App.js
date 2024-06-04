// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstAccess from './utils/pages/FirstAccess/FirstAsccess.js';
import EventCreate from './utils/pages/EventCreate/EventCreate.js';
import AllEvents from './utils/pages/EventPageAll/AllEvents.js';
import Login from './utils/pages/Login/login.js';
import Profile from './utils/pages/profile/profile.js';
import MainEvents from './utils/pages/main/mainEvents';
import EventPage from './utils/pages/EventPage/EventPage.js';
import { SessionProvider } from './api/context/SessionContext.js';


function App() {
  return (
    <Router>


      <SessionProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/firstaccess" element={<FirstAccess />} />
            <Route path="/eventcreate" element={<EventCreate />} />
            <Route path="/allevents" element={<AllEvents />} />
            <Route path="/mainevents" element={<MainEvents/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/eventpage/:eventId" element={<EventPage />} />
          </Routes>
        </div>
      </SessionProvider>
    </Router>
  );
}

export default App;
