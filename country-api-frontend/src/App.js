import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import CountriesPage from './pages/CountriesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/main.scss';

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/countries" element={<CountriesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MainLayout>
      </AuthProvider>
    </Router>
  );
}

export default App;