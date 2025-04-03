//App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TourDetails from './pages/TourDetails';
import SortedTours from './pages/SortedTours';
import Payment from './pages/Payment';
import BookingForm from './components/BookingForm';



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tour/:id" element={<TourDetails />} />
                <Route path="/excursion/:id" element={<TourDetails />} />
                <Route path="/sorted-tours" element={<SortedTours />} />
                <Route path="/booking" element={<BookingForm />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
        </Router>
    );
};

export default App;
