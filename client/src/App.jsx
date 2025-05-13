import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import './styles/global.css';
import { AuthProvider } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./components/Dashboard"; 
import DashboardPage from "./pages/DashboardPage";
import UploadImage from "./pages/UploadImage";
import ResultPage from "./pages/ResultPage";
import UploadHistory from './pages/dashboard/UploadHistory';
import HealthReports from './pages/dashboard/HealthReports';
import Doctors from './pages/dashboard/Doctors';
import DoctorBooking from './pages/dashboard/DoctorBooking';
import Settings from './pages/dashboard/Settings';
import EducationSection from './components/EducationSection';
import PrivateRoute from './components/PrivateRoute';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import FAQ from './pages/FAQ';

import WhatIsOralCancer from './pages/education/WhatIsOralCancer';
import EarlyDetection from './pages/education/EarlyWarningSigns';
import CheckAtHome from './pages/education/CheckAtHome';
import HealthTips from './pages/education/HealthTips';
import WhenToSeeDoctor from './pages/education/OralDisease';
import Facts from './pages/education/Facts';

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<UploadImage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/education" element={<EducationSection />} />
          <Route path="/education/what-is-oral-cancer" element={<WhatIsOralCancer />} />
          <Route path="/education/early-detection" element={<EarlyDetection />} />
          <Route path="/education/check-at-home" element={<CheckAtHome />} />
          <Route path="/education/health-tips" element={<HealthTips />} />
          <Route path="/education/oral-disease" element={<WhenToSeeDoctor />} />
          <Route path="/education/facts" element={<Facts />} />
          <Route path="/terms" element={<Terms />}/>
          <Route path="/privacy" element={<Privacy />}/>
          <Route path="/faq" element={<FAQ />}/>



          
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardPage />} />
            <Route path="upload-history" element={<UploadHistory />} />
            <Route path="health-reports" element={<HealthReports />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="doctors/:doctorId" element={<DoctorBooking />} />
            <Route path="learn" element={<EducationSection />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardPage />
    </PrivateRoute>
  }
/>
        </Routes>
      </main>
    </div>
  );
}

export default App;



