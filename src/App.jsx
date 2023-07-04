import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/public/login/login';
import Dashboard from './pages/private/dashboard/dashboard';


function App() {
  const isAuthenticated = () => {
    // Verificar se o usuário está autenticado
    const token = localStorage.getItem('token');
    return !!token;
  };
  const PrivateRoute = ({ children, ...rest }) => {
    return isAuthenticated() ? children : <Navigate to="/" />;
  };

  const PublicRoute = ({ children, ...rest }) => {
    return isAuthenticated() ? <Navigate to="/dashboard" /> : children;
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/dashboard/*" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;