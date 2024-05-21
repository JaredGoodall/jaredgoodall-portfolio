import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(...registerables);

function Polar({ names, stats, colours, accents }) {
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
        label: '# of Messages',
        data: stats, 
        backgroundColor: accents,
        borderColor: colours,
        borderWidth: 2,
      },
    ],
  };

  return <PolarArea options={options} data={data} />;
}

export default Polar;
