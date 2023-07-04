import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale);

const AgeChart = ({ data }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Função para contar a quantidade de clientes por faixa etária
    const countByAgeRange = (data) => {
      const ageRanges = {
        '0-18': 0,
        '19-30': 0,
        '31-45': 0,
        '46-60': 0,
        '61+': 0,
      };

      data.forEach((user) => {
        const age = user.dob.age;

        if (age <= 18) {
          ageRanges['0-18'] += 1;
        } else if (age <= 30) {
          ageRanges['19-30'] += 1;
        } else if (age <= 45) {
          ageRanges['31-45'] += 1;
        } else if (age <= 60) {
          ageRanges['46-60'] += 1;
        } else {
          ageRanges['61+'] += 1;
        }
      });

      return Object.values(ageRanges);
    };

    // Chamando a função para obter os dados contados
    const ageCount = countByAgeRange(data);

    // Dados e opções do gráfico
    const chartData = {
      labels: ['0-18', '19-30', '31-45', '46-60', '61+'],
      datasets: [
        {
          label: 'Clientes por faixa etária',
          data: ageCount,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    setChartData(chartData);
  }, [data]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  const chartOptions = {
    scales: {
      x: {
        type: 'category',
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        type: 'linear',
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div style={{margin:'0 auto', padding:'10px', textAlign:'center'}}>
      <h2 style={{fontSize:'24px', color:'#918b8b', marginBottom:'20px'}}>Clientes por faixa etária</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default AgeChart;
