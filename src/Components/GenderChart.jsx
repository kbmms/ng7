import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const GenderChart = ({ data }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Process the data and prepare the chartData
    const countByGender = (data) => {
      const genders = data.map((user) => user.gender.toLowerCase());
      const maleCount = genders.filter((gender) => gender === 'male').length;
      const femaleCount = genders.filter((gender) => gender === 'female').length;
      
      return {
        labels: ['Masculino', 'Feminino'],
        datasets: [
          {
            label: 'Clientes por gênero',
            data: [maleCount, femaleCount],
            backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
            borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      };
    };

    const processedData = countByGender(data);
    setChartData(processedData);
  }, [data]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{margin:'0 auto', padding:'10px', textAlign:'center'}}>
      <h2 style={{fontSize:'24px', color:'#918b8b', marginBottom:'20px'}}>Clientes por gênero</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default GenderChart;
