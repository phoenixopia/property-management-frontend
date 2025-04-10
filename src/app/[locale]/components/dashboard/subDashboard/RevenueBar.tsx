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



const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

export const data = {
  labels,
  datasets: [
    {
      label: 'undpaid',
      data: [26,87,97,94,23,545],
      backgroundColor: '#946c6c',
      
    },
    {
      label: 'paid',
      data:[89,45,23,211,21],
      backgroundColor: '#01567d',
    },
    {
        label: 'total',
        data:[89,45,23,211,21],
        backgroundColor: '#426cf5',
      },
  ],
};

const RevenueBar= ()=> {
  return <Bar  data={data} options={{ maintainAspectRatio: false, responsive: true }}/>;
}

export default RevenueBar