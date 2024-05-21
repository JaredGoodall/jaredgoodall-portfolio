import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(...registerables);

function PieChart({ label, names, stats, colours, accents }) {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    labels: names,
    datasets: [
      {
        data: stats, 
        label: label,
        backgroundColor: accents,
        borderColor: colours,
        borderWidth: 2,
      },
    ],
  };

  return <Pie options={options} data={data} />;
}

export default PieChart;
