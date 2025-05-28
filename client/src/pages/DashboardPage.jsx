import React, { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  console.log("user in DashboardPage:", user); // Debugging line

  if (!user) {
    return <div>Loading...</div>; // or redirect to login if not authenticated
  }

  return <Dashboard user={user} />;
};

export default DashboardPage;
