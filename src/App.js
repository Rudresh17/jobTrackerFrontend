import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard  from './components/Dashboard';
import Home from "./components/Home"
import RoutesComponent from  "./components/Routes";
import LandingPage from './components/LandingPage';

function App() {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </>
  );
}

export default App;
