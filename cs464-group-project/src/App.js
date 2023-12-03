//
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Team } from './pages/Team/TeamsMainPage';
import { Player } from './pages/PlayersMainPage';
import { IndividualPlayer } from './pages/Players/IndividualPlayer';
import { IndividualTeam } from './pages/IndividualTeam';
import NavBar from './pages/NavBar';

function App() {
  return (
    <Router>
      <div className='App'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/teamsmainpage' element={<Team />} />
          <Route path='/player' element={<Player />} />
          <Route path='/individualteam' element={<IndividualTeam />} />
          <Route path='/IndividualPlayer/:id' element={<IndividualPlayer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
