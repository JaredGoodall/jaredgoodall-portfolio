import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(...registerables);

function Polar({ names, stats, colours, accents }) {
  const data = {
    labels: names,
    datasets: [
      {
        label: '# of Votes',
        data: stats, // Use the stats prop as the data for the chart
        backgroundColor: accents,
        borderColor: colours,
        borderWidth: 2,
      },
    ],
  };

  return <PolarArea data={data} />;
}

export default Polar;
