import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListGamesPage from './pages/ListGamesPage';
import RecordPage from './pages/RecordPage';
import CartsGames from './pages/CartsGames';
import PrincipalHeader from './component/shared/PrincipalHeader';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './component/ProtectedRoutes/ProtectedRoutes';

function App() {
  return (
    <div>
      <Router>
        <PrincipalHeader />
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute><ListGamesPage /></PrivateRoute>} />
          <Route path="/CartsPage" element={<PrivateRoute><CartsGames /></PrivateRoute>} />
          <Route path="/RecordPage" element={<PrivateRoute><RecordPage /></PrivateRoute>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
