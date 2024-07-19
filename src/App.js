// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddEditEventPage from './pages/AddEditEventPage';
import EventsPage from './pages/EventsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddEditEventPage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
