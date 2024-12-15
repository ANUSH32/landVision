import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './routes/DashboardLayout';
import SpacePlanningWizard from './routes/questions/SpacePlanningWizard';
import HeaderLan from './LandingPage/HeaderLan';
import HeroLan from './LandingPage/Hero';
import '../LandingPage/Lan.css';

const App = () => {
  return (
    <div className="App">
       <div className="no-scroll">
            <HeaderLan />
            <HeroLan />
           
        </div>
        <Routes>
          <Route path="/questions" element={<SpacePlanningWizard />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
        </Routes>
    </div>
  );
}

export default App;
