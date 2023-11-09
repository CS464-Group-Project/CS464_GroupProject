import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Api from './components/Api/Api.js';

function App() {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<Api />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
