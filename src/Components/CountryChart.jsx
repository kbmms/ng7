import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CountryChart = ({ data }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Função para contar a quantidade de clientes por país
    const countByCountry = (data) => {
      const countryCounts = {};

      data.forEach((user) => {
        const country = user.location.country;
        if (countryCounts[country]) {
          countryCounts[country]++;
        } else {
          countryCounts[country] = 1;
        }
      });

      return countryCounts;
    };

    // Chamando a função para obter os dados contados
    const countryCounts = countByCountry(data);

    // Ordenando os países em ordem decrescente de quantidade de clientes
    const sortedCountries = Object.keys(countryCounts).sort(
      (a, b) => countryCounts[b] - countryCounts[a]
    );

    // Limitando o número de países exibidos no gráfico (opcional)
    const maxCountries = 5;
    const topCountries = sortedCountries.slice(0, maxCountries);

    // Dados e opções do gráfico
    const chartData = {
      labels: topCountries,
      datasets: [
        {
          label: 'Clientes por país',
          data: topCountries.map((country) => countryCounts[country]),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
          ].slice(0, topCountries.length),
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ].slice(0, topCountries.length),
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
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{margin:'0 auto', padding:'10px', textAlign:'center', width:'100%'}}>
      <h2  style={{fontSize:'24px', color:'#918b8b', marginBottom:'20px'}}>Clientes por país</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default CountryChart;
