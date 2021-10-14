import React from 'react';
import {Bar} from 'react-chartjs-2'

const Grafico = ({comarcasCat, habitantes, titulo}) => {
    return ( 
          <Bar 
          data={{
            labels: comarcasCat,
            datasets: [
               {
                  label: titulo,
                  data:habitantes,
                  backgroundColor: [
                'rgba(54, 162, 235, 0.2)'
                  ],
                  borderColor: [
                'rgba(54, 162, 235, 1)'
            ],
                  borderWidth: 1
               }
            ]
          }}
          height={12}
          width={30}
          options={{
            scales: {
               yAxes: [
                  {
                     ticks: {
                        beginAtZero: true,
                     }
                  }
                  
               ]
            }
            }}
          />
     );
}
 
export default Grafico;