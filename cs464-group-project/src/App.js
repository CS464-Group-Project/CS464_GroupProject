import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Team } from './pages/Team';
import { Player } from './pages/Player';
import NavBar from './components/navigationBar/NavBar';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/player" element={<Player />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
