import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Filler,
  CategoryScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Filler,
  CategoryScale
);

interface DataPoint {
  date: string;
  amount: number;
  name: string;
}

interface CumulativeChartProps {
  data: DataPoint[];
}

const CumulativeChart: React.FC<CumulativeChartProps> = ({ data }) => {
  let cumulative = 0;

  const values = data.map((d) => {
    cumulative += d.amount;
    return {
      x: d.date,
      y: cumulative,
      name: d.name,
      amount: d.amount,
    };
  });

  const chartData = {
    datasets: [
      {
        label: 'Накопичена сума',
        data: values,
        fill: true,
        borderColor: '#8dd940',
        backgroundColor: 'rgba(141, 217, 64, 0.3)',
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const point = context.raw;
            return ` ${point.name} повисив(ла) до: ${point.y})`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          tooltipFormat: 'yyyy-MM-dd HH:mm',
          displayFormats: {
            hour: 'yyyy-MM-dd HH:mm',
          },
        },
        title: {
          display: true,
          text: 'Дата та час',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Сума (грн)',
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default CumulativeChart;
