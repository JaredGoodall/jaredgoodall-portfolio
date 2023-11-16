import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerables);

function PieChart({ label, names, stats, colours, accents }) {
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

  return <Bar data={data} />;
}

export default PieChart;
