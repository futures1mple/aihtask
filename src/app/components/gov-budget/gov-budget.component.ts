import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-gov-budget',
  templateUrl: './gov-budget.component.html',
  styleUrls: ['./gov-budget.component.scss']
})
export class GovBudgetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public data = [
    {
      data: [ 3, 2.1, 3, 4, 5, 6, 7, 8, 9 ],
      label: 'Income',
      color: 'rgba(52,125,160,255)',
      line: false
    },
    {
      data: [ 6.4, 7.1, 7, 6, 5, 4, 3, 2, 1 ],
      label:'Spending',
      color: 'rgba(226,120,112,255)',
      line: false
    },
    {
      data: [ 1.1, 1.2, 1, 2 ,3, 1, 2, 3, 1 ],
      label: 'Export',
      color: 'red',
      line: true
    },
    {
      data: [ 4, 5, 8, 3, 2, 1, 7, 6, 9 ],
      label: 'Import',
      color: 'green',
      line: true
    }
  ]

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      y: {
        display: false,
        stack: 'stack',
        stacked: true,
      },
      yL: {
        display: false,
        stacked: true,
        stack: 'stack',
        offset: true,
      },
      x: {
        min: 0,
        max: 1,
        grid: {
          display: false
        },
        
      },
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
      { 
        data: [ 3, 2.1, 3, 4, 5, 6, 7, 8, 9 ], 
        label: 'Income', 
        backgroundColor: 'rgba(52,125,160,255)',
        stack: 'combined',
      },
      { 
        data: [  6.4, 7.1, 7, 6, 5, 4, 3, 2, 1 ], 
        label: 'Spending', 
        backgroundColor: 'rgba(226,120,112,255)', 

      },
      { 
        data: [ 3, 7.1, 7, 6, 5, 4, 3, 2, 1 ], 
        label: 'Export', 
        yAxisID: 'yL',
        borderColor: 'red', 
        backgroundColor: 'transparent',
        pointBackgroundColor: 'red',
        borderDash: [10,4],
        pointBorderColor: 'red',
        type: 'line',
        stack: 'combined',
        pointStyle: 'rect',
        datalabels: {
          labels: {
            title: {
              textStrokeColor:'grey',
              borderColor: 'grey',
              align: 'top',
              color: 'black'
            }
          }
        }
      },
      { 
        data: [ 4, 5, 8, 3, 2, 1, 7, 6, 9 ], 
        label: 'Import', 
        yAxisID: 'yL',
        borderColor: 'green', 
        backgroundColor: 'transparent', 
        pointBackgroundColor: 'green',
        pointBorderColor: 'green',
        borderDash: [10,4],
        type: 'line',
        stack: 'combined',
        pointStyle: 'rect',
        datalabels: {
          labels: {
            title: {
              align: 'top',
              color: 'black'
            }
          }
        }
      },
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
