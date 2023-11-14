import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Team } from './pages/Team/TeamsMainPage';
import { Player } from '/pages/Player';
import { IndividualTeam } from './pages/Team/IndividualTeam';
import NavBar from './components/navigationBar/NavBar';

function App() {
    return (
        <Router>
            <div className='App'>
                <NavBar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/teamsmainpage' element={<Team />} />
                    <Route path='/player' element={<Player />} />
                    <Route
                        path='/individualteam'
                        element={<IndividualTeam />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
