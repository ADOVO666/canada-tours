//App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import TourDetails from './pages/TourDetails';
import SortedTours from './pages/SortedTours';
import Payment from './pages/Payment';
import BookingForm from './components/BookingForm';
import Register from './pages/Register';
import Login from './pages/Login';

const isAuthenticated = () => {
    return sessionStorage.getItem("authenticated") === "true";
};
  
const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tour/:id" element={<ProtectedRoute> <TourDetails /> </ProtectedRoute>} />
                <Route path="/excursion/:id" element={<ProtectedRoute> <TourDetails /> </ProtectedRoute>} />
                <Route path="/sorted-tours" element={<ProtectedRoute> <SortedTours /> </ProtectedRoute>} />
                <Route path="/booking" element={<ProtectedRoute> <BookingForm /> </ProtectedRoute>} />
                <Route path="/payment" element={<ProtectedRoute> <Payment /> </ProtectedRoute>} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
