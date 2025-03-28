// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TourDetails from './pages/TourDetails';

function App() {
    return (
        <Router>
            <Routes>
                {/* Главная страница */}
                <Route path="/" element={<Home />} />
                {/* Страница с деталями тура */}
                <Route path="/tour/:id" element={<TourDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
