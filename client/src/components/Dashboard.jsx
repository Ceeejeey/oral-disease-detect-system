import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import "../styles/global.css";
import { motion } from 'framer-motion';
import axios from "axios";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [detectionSummary, setDetectionSummary] = useState({ cancer: 0, other: 0 });

  const location = useLocation();
  const isRootDashboard = location.pathname === "/dashboard";

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const storedUploads = JSON.parse(localStorage.getItem("uploads")) || [];
    const storedSummary = JSON.parse(localStorage.getItem("detectionSummary")) || { cancer: 0, other: 0 };
  
    // ✅ Remove duplicate appointments (based on doctor, date, time)
    const uniqueAppointments = [];
    const seen = new Set();
  
    for (const appt of storedAppointments) {
      const key = `${appt.doctor}-${appt.date}-${appt.time}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueAppointments.push(appt);
      }
    }
  
    // ✅ Save cleaned appointments back to localStorage
    localStorage.setItem("appointments", JSON.stringify(uniqueAppointments));
  
    setAppointments(uniqueAppointments);
    setUploads(storedUploads);
    setDetectionSummary(storedSummary);
  }, []);
  

  const groupAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    const todaysAppointments = [];
    const upcomingAppointments = [];

    appointments.forEach((appt) => {
      if (appt.date === today) {
        todaysAppointments.push(appt);
      } else if (new Date(appt.date) > new Date(today)) {
        upcomingAppointments.push(appt);
      }
    });

    todaysAppointments.sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`));
    upcomingAppointments.sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`));

    return { todaysAppointments, upcomingAppointments };
  };

  const cardAnimation = (delay) => ({
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay }
  });

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">SmileSafe.ai</h2>
        <nav className="nav-links">
          <Link to="/dashboard">🏠 Dashboard</Link>
          <Link to="/upload">📤 Upload Image</Link>
          <Link to="/dashboard/upload-history">📁 Upload History</Link>
          <Link to="/dashboard/health-reports">📊 Health Reports</Link>
          <Link to="/dashboard/doctors">🧑‍⚕️ Doctors</Link>
          <Link to="/dashboard/learn">📚 Learn</Link>
          <Link to="/dashboard/settings">⚙️ Settings</Link>
          <Link to="/" className="logout-link">🚪 Logout</Link>
        </nav>
      </aside>

      <main className="main-content">
        <div className="top-bar">
          <h1>Welcome back 👋</h1>
          <input type="text" placeholder="Search doctors, reports..." className="search-box" />
        </div>

        {isRootDashboard ? (
          <div className="cards-container">
            <motion.div className="card" {...cardAnimation(0.1)}>
              <h2>Total Uploads</h2>
              <p>{uploads.length} mouth images analyzed</p>
            </motion.div>

            <motion.div className="card" {...cardAnimation(0.2)}>
              <h2>Detection Summary</h2>
              <p>{detectionSummary.cancer} potential cancer cases, {detectionSummary.other} other conditions</p>
            </motion.div>

            <motion.div className="card" {...cardAnimation(0.3)}>
              <h2>Upcoming Appointments</h2>
              {appointments.length === 0 ? (
                <p>No appointments booked yet</p>
              ) : (
                (() => {
                  const { todaysAppointments, upcomingAppointments } = groupAppointments();

                  return (
                    <>
                      {todaysAppointments.length > 0 && (
                        <>
                          <h3>Today's Appointments</h3>
                          <ul>
                            {todaysAppointments.map((a, i) => (
                              <li key={i} className="today-appointment">
                                🕒 {a.doctor} — {a.time}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {upcomingAppointments.length > 0 && (
                        <>
                          <h3>Upcoming Appointments</h3>
                          <ul>
                            {upcomingAppointments.map((a, i) => (
                              <li key={i}>
                                {a.doctor} — {a.date} at {a.time}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </>
                  );
                })()
              )}
            </motion.div>

            <motion.div className="card full-width" {...cardAnimation(0.4)}>
              <h2>Health Index Over Time</h2>
              <p>Overall oral health score trend [Graph Placeholder]</p>
            </motion.div>

            <motion.div className="card full-width" {...cardAnimation(0.5)}>
              <h2>Quick Upload</h2>
              <p>Click below to upload a new image for analysis.</p>
              <Link to="/upload" className="upload-button">Upload Now</Link>
            </motion.div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default Dashboard;

/*
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import "../styles/global.css";
import { motion } from 'framer-motion';
import axios from "axios";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [detectionSummary, setDetectionSummary] = useState({ cancer: 0, other: 0 });

  const location = useLocation();
  const isRootDashboard = location.pathname === "/dashboard";

  useEffect(() => {
   
    axios.get("http://localhost:8000/dashboard-data")
      .then((response) => {
        const { appointments, uploads, detectionSummary } = response.data;
        setAppointments(appointments);
        setUploads(uploads);
        setDetectionSummary(detectionSummary);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  const groupAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    const todaysAppointments = [];
    const upcomingAppointments = [];

    appointments.forEach((appt) => {
      if (appt.date === today) {
        todaysAppointments.push(appt);
      } else if (new Date(appt.date) > new Date(today)) {
        upcomingAppointments.push(appt);
      }
    });

    todaysAppointments.sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`));
    upcomingAppointments.sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`));

    return { todaysAppointments, upcomingAppointments };
  };

  const cardAnimation = (delay) => ({
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay }
  });

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">SmileSafe.ai</h2>
        <nav className="nav-links">
          <Link to="/dashboard">🏠 Dashboard</Link>
          <Link to="/upload">📤 Upload Image</Link>
          <Link to="/dashboard/upload-history">📁 Upload History</Link>
          <Link to="/dashboard/health-reports">📊 Health Reports</Link>
          <Link to="/dashboard/doctors">🧑‍⚕️ Doctors</Link>
          <Link to="/dashboard/learn">📚 Learn</Link>
          <Link to="/dashboard/settings">⚙️ Settings</Link>
          <Link to="/" className="logout-link">🚪 Logout</Link>
        </nav>
      </aside>

      <main className="main-content">
        <div className="top-bar">
          <h1>Welcome back 👋</h1>
          <input type="text" placeholder="Search doctors, reports..." className="search-box" />
        </div>

        {isRootDashboard ? (
          <div className="cards-container">
            <motion.div className="card" {...cardAnimation(0.1)}>
              <h2>Total Uploads</h2>
              <p>{uploads.length} mouth images analyzed</p>
            </motion.div>

            <motion.div className="card" {...cardAnimation(0.2)}>
              <h2>Detection Summary</h2>
              <p>{detectionSummary.cancer} potential cancer cases, {detectionSummary.other} other conditions</p>
            </motion.div>

            <motion.div className="card" {...cardAnimation(0.3)}>
              <h2>Upcoming Appointments</h2>
              {appointments.length === 0 ? (
                <p>No appointments booked yet</p>
              ) : (
                (() => {
                  const { todaysAppointments, upcomingAppointments } = groupAppointments();

                  return (
                    <>
                      {todaysAppointments.length > 0 && (
                        <>
                          <h3>Today's Appointments</h3>
                          <ul>
                            {todaysAppointments.map((a, i) => (
                              <li key={i} className="today-appointment">
                                🕒 {a.doctor} — {a.time}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {upcomingAppointments.length > 0 && (
                        <>
                          <h3>Upcoming Appointments</h3>
                          <ul>
                            {upcomingAppointments.map((a, i) => (
                              <li key={i}>
                                {a.doctor} — {a.date} at {a.time}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </>
                  );
                })()
              )}
            </motion.div>

            <motion.div className="card full-width" {...cardAnimation(0.4)}>
              <h2>Health Index Over Time</h2>
              <p>Overall oral health score trend [Graph Placeholder]</p>
            </motion.div>

            <motion.div className="card full-width" {...cardAnimation(0.5)}>
              <h2>Quick Upload</h2>
              <p>Click below to upload a new image for analysis.</p>
              <Link to="/upload" className="upload-button">Upload Now</Link>
            </motion.div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
*/