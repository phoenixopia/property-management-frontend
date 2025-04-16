"use client";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface RevenueBarProps {
  revenueData: Record<string, {
    total: number;
    paid: number;
    unpaid: number;
  }>;
}

const RevenueBar = ({ revenueData }: RevenueBarProps) => {
  const months = Object.keys(revenueData);
  
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Unpaid',
        data: months.map(month => revenueData[month].unpaid),
        backgroundColor: '#946c6c',
      },
      {
        label: 'Paid',
        data: months.map(month => revenueData[month].paid),
        backgroundColor: '#01567d',
      },
      {
        label: 'Total',
        data: months.map(month => revenueData[month].total),
        backgroundColor: '#426cf5',
      },
    ],
  };

  return (
    <Bar 
      data={data} 
      options={{ 
        maintainAspectRatio: false, 
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#6b7280',
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              color: '#e5e7eb'
            }
          }
        }
      }} 
    />
  );
}

export default RevenueBar;