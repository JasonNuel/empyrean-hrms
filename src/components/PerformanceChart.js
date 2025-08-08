import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PerformanceChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Performance Score',
        data: [70, 85, 78, 90, 88, 95],
        backgroundColor: 'rgb(90, 14, 14)',
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div style={{ width: '90%', height: '300px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Performance Overview</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PerformanceChart;
