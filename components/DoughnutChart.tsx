

'use client';
import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import {Chart as chartJS, ArcElement, Tooltip, Legend} from 'chart.js';

chartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({accounts} : DoughnutChartProps) => {

    //create datasets of amount display in chart
    const data ={
        datasets: [
            {
                label: 'Banks',
                data: [1245, 3490, 3091, 12909],
                backgroundColor: ['#0747b6', '#2265d8', '#2f91fa', '#2390f1']
            }
        ],
        labels: ['Bank1', 'Bank2', 'Bank3', 'Bank4']
    }

  return (
    <div>
        <Doughnut data={data}
        options={{ 
            cutout: '40%',
            plugins: {
                legend: {
                    display: false
                }
            }
         }} />
    </div>
  )
}

export default DoughnutChart