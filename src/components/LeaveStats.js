// src/components/LeaveStats.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './LeaveStats.css';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const LeaveStats = () => {
  const data = {
    labels: ['On Leave', 'Present'],
    datasets: [
      {
        data: [5, 53], // 5 employees on leave, 53 present
        backgroundColor: ['#151513ff', 'rgb(90, 14, 14)'], // gold & green
        borderWidth: 1,
      },
    ],
  };
  

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#555',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="leave-stats-box">
      <h3>Leave Statistics</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};



export default LeaveStats;
