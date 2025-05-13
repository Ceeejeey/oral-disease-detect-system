import React from 'react';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
  const user = { name: 'Sarah' }; 

  return <Dashboard user={user} />;
};

export default DashboardPage;

