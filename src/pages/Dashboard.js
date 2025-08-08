import React from 'react';
import DashboardCards from '../components/DashboardCards';
import AnnouncementBox from '../components/AnnouncementBox';
import LeaveStats from '../components/LeaveStats';
import PerformanceChart from '../components/PerformanceChart';
import EmployeeWorkInfo from '../components/EmployeeWorkInfo';
import UpcomingTasks from '../components/UpcomingTasks';

import './Dashboard.css';
import ActivityTimeline from '../components/ActivityTimeline';
import QuickAccess from '../components/QuickAccess';

const Dashboard = () => {
  return (
    <div className="dashboard-content">
      <DashboardCards />

      <div className="announcement-leave-row">
  <div className="announcement-box">
    <AnnouncementBox />
  </div>
  <div className="leave-box">
    <LeaveStats />
  </div>
</div>

<div className="lower-widgets">
  <ActivityTimeline />
  <UpcomingTasks /> 
</div>

<EmployeeWorkInfo />

<div className="performance-chart-row">
  <PerformanceChart />
</div>

<QuickAccess />

    </div>
    
  );
};


export default Dashboard;
