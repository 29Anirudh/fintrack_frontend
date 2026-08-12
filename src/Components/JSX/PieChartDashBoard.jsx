import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
const PieChartDashBoard = ({debitandcredit}) => {
    const debit=debitandcredit.find(d=>d.type==='DEBIT')?.amount||0;
    const credit=debitandcredit.find(d=>d.type==='CREDIT')?.amount||0;
    const data = {
        labels:['Debits','Credits'],
        datasets: [ 
        {
            data: [debit,credit],
            backgroundColor: ['#ef4444','#22c55e'],
            borderWidth: 0,
            // borderRadius: 5,
            spacing: 3,
            hoverOffset: 8  
        },
        ],
    };

  const options = {
    responsive: true,
    mantainAspectRatio:false,
    cutout:"70%",
    plugins: {
        legend:{
            position:'bottom',
            labels:{
                usePointStyle:true,
                pointStyle:"circle",
                padding:15,
                font:{
                    size:13,
                    weight:"600"
                }
            }
        },
        tooltip: {
            backgroundColor: "#626b79",
            titleColor: "#000000",
            bodyColor: "#000000",
            font:{
                size:20
            }
        }
    },
  };
  if(debitandcredit.length===0){
    return (
        <div className='flex flex-col items-center justify-center h-full w-full'>
            <h1 className='text-slate-400 text-sm font-semibold'>No data available</h1>
        </div>
    )
  }
  return (
    <Doughnut data={data} options={options}/>
  )
}

export default PieChartDashBoard
