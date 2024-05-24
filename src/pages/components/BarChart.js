import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerables);

function PieChart({ label, names, stats, colours, accents }) {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {    
      x: {  
        display: false
      }
    }
  };

  const data = {
    labels: names,
    datasets: [
      {
        data: stats, // Use the stats prop as the data for the chart
        label: label,
        backgroundColor: accents,
        borderColor: colours,
        borderWidth: 2,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default PieChart;
