import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import MapDashboard from './components/MapView';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReportPage from './components/Report';
import DashboardPage from './components/DashboardAnalytics';
import Dashboard2 from './components/Dashboard2';


function App() {
  return (
     <Router basename="/coBuild">
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapDashboard />} />
        <Route path="/dashboard" element={<Dashboard2 />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="analytics" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
