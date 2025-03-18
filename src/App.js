import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TourDetail from './pages/TourDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tour/:id" element={<TourDetail />} />
      </Routes>
    </Router>
  );
};

export default App;