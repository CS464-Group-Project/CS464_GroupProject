import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Team } from './pages/Team';
import NavBar from './components/navigationBar/NavBar';

function App() {
    return (
        <Router>
            <div className='App'>
                <NavBar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/team' element={<Team />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
