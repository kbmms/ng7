import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/public/login/login';
import Cadastro from './pages/public/cadastro/cadastro';

import Dashboard from './pages/private/dashboard/dashboard';
import Lancamentos from './pages/private/lancamentos/lancamentos';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
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
        <Route path="/cadastro" element={<PublicRoute><Cadastro /></PublicRoute>} />
        <Route path="/dashboard/*" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/lancamentos/*" element={<PrivateRoute><Lancamentos /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;