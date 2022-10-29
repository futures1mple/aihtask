import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor() {

  }
  

  ngOnInit(): void {
    
  }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public data = [
    {
      data: [ 43.6, 45.0, 1, 2, 3, 4, 5, 6, 7 ],
      label: 'Sofaz',
      color: 'rgba(52,125,160,255)'
    },
    {
      data: [ 6.4, 7.1, 7, 6, 5, 4, 3, 2, 1 ],
      label:'Cbar',
      color: 'rgba(226,120,112,255)'
    },
    {
      data: [ 1.1, 1.2, 1, 2 ,3, 1, 2, 3, 1 ],
      label: 'Mof',
      color: 'rgba(67,188,180,255)'
    }
  ]

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,

    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      
      x: {
        min: 0,
        max: 1,
        stacked: true,
        grid: {
          display: false
        }
      },
      y: {
        display: false,
        stacked: true,
      }
    },
    plugins: {
      legend: {
        display: false,
        align: "start"
      },
      datalabels: {
        labels: {
          title: {
            color: 'white'
          }
        },
        anchor: 'center',
        formatter: (value, context) => {

          const sumValue = context.chart.config.data.datasets.map((datapoint)=>{
            return datapoint.data[context.dataIndex]
          })
          function totalSum (total: any, datapoint: any) {
            return total + datapoint
          }
          const sum = sumValue.reduce(totalSum,0)

          return value < sum/10 ? "" : `${value}` ;
        }
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public scroll = (event: WheelEvent, chart: any) => {
    // console.log(event);
    // console.log(chart);
    const dataLength = chart.chart.data.labels.length
    
    if(event.deltaY > 0) {
      if(chart.chart.config.options.scales.x.max >= dataLength - 1) {
        chart.chart.config.options.scales.x.min = dataLength - 2
        chart.chart.config.options.scales.x.max = dataLength - 1
      } else {
        chart.chart.config.options.scales.x.min += 1
        chart.chart.config.options.scales.x.max += 1
      }
    } else if(event.deltaY < 0) {
      if(chart.chart.config.options.scales.x.min <= 0) {
        chart.chart.config.options.scales.x.min = 0
        chart.chart.config.options.scales.x.max = 1
      } else {
        chart.chart.config.options.scales.x.min -= 1
        chart.chart.config.options.scales.x.max -= 1
      }
    }
    chart.update()
    
  }

  public barChartData: ChartData = {
    labels: [ '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022' ],
    datasets: [
      { data: this.data[0].data, barThickness: 80, label: this.data[0].label, backgroundColor: this.data[0].color },
      { data: this.data[1].data, barThickness: 80, label: this.data[1].label, backgroundColor: this.data[1].color },
      { data: this.data[2].data, barThickness: 80, label: this.data[2].label, backgroundColor: this.data[2].color },
      { 
        data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
        
        datalabels: {
          labels: {
            title: {
              color: 'black'
            }
          },
          align: 'top',
          anchor: 'end',
          formatter: (value, context) => {
            const sumValue = context.chart.config.data.datasets.map((datapoint)=>{
              return datapoint.data[context.dataIndex]
            })
            function totalSum (total: any, datapoint: any) {
              return total + datapoint
            }
            const sum = sumValue.reduce(totalSum,0)

            return sum ;
          }
        },
        label: '',
        borderColor: 'transparent',
        backgroundColor:'transparent'
      }
      // { 
      //   data: [ 87, 34, 23, 19, 86, 55, 90 ], 
      //   label: 'Non-oil', 
      //   type: 'line',  
      //   borderColor: 'red', 
      //   backgroundColor: 'red', 
      //   pointBorderColor: 'grey', 
      //   pointBackgroundColor:'red', 
      //   borderDash: [10,4],
      //   pointStyle: 'rect',
      //   datalabels: {
      //     display: false
      //   }
      // }
    ],
  };
}
