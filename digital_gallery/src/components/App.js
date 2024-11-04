// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './home';
import Photography from './Photography';
import Painting from './Painting';
import Artist from './Artist';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/photography" element={<Photography />} />
                <Route path="/painting" element={<Painting />} />
                <Route path="/artist" element={<Artist />} />
            </Routes>
        </Router>
    );
}

export default App;
