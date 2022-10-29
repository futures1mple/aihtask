import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart,ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import {default as Annotation} from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-population',
  templateUrl: './population.component.html',
  styleUrls: ['./population.component.scss']
})
export class PopulationComponent implements OnInit {

  constructor() {
    Chart.register(Annotation)
  }

  ngOnInit(): void {
    this.data[2].data.forEach((datapoint, index) => {
      this.annotations.push({
        type: 'label',
        xValue: index,
        yValue: 30.5,
        backgroundColor: this.data[2].color,
        color: 'white',
        content: `${datapoint}`,
        padding: 10,
        font: {
          size: 14
        }
      })
    })
  }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public annotations: Object[] = []
  public data = [
    {
      data: [ 23, 12, 1, 2, 3, 4, 5, 6, 7 ],
      label: 'Unemployed (k)',
      color: 'rgba(52,125,160,255)',
      line: false,
    },
    {
      data: [ 6.4, 7.1, 7, 6, 5, 4, 3, 2, 1 ],
      label:'Workforce (k)',
      color: 'rgba(226,120,112,255)',
      line: true,
    },
    {
      data: [ 1.1, 1.2, 1, 2 ,3, 1, 2, 3, 1 ],
      label: 'Salary(₼)',
      color: 'rgba(125,151,181,255)',
      line: false,
    }
  ]

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        // display: false,
        stacked: true,
        stack: 'stack',
        min: 0,
      },
      yB: {
        // display: false,
        stacked: true,
        stack: 'stack',
        beginAtZero: true,
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
      annotation: {
        annotations: this.annotations
      },
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
  public barChartType: ChartType = 'line';
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
        data: [ 23, 12, 1, 2, 3, 4, 5, 6, 7 ], 
        barThickness: 80, 
        label: 'Unemployed (k)', 
        backgroundColor: 'rgba(52,125,160,255)',
        type: 'bar',
      },
      { 
        data: [ 6.4, 7.1, 7, 6, 5, 4, 3, 2, 1 ], 
        yAxisID: 'yB',
        label: 'Workforce (k)', 
        borderColor: 'rgba(226,120,112,255)', 
        backgroundColor: 'transparent', 
        pointBackgroundColor: 'rgba(226,120,112,255)',
        pointBorderColor: 'rgba(226,120,112,255)',
        borderDash: [10,4],
        type: 'line',
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
        },
      },
    ],
  };

}
