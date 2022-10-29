import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {default as Annotation} from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-gross-product',
  templateUrl: './gross-product.component.html',
  styleUrls: ['./gross-product.component.scss']
})
export class GrossProductComponent implements OnInit {

  constructor() { 
    Chart.register(Annotation)
  }

  ngOnInit(): void {
    this.data[4].data.forEach((datapoint, index) => {
      this.annotations.push({
        type: 'label',
        xValue: index,
        yValue: 30.5,
        backgroundColor: this.data[4].color,
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

  public data = [
    {
      data: [ 3, 2.1, 3, 4, 5, 6, 7, 8, 9 ],
      label: 'Other',
      color: 'rgba(142,189,100,255)',
      line: false
    },
    {
      data: [ 6.4, 7.1, 7, 6, 5, 4, 3, 2, 1 ],
      label:'ItAndTelecom',
      color: 'rgba(95,155,216,255)',
      line: false
    },
    {
      data: [ 4, 5, 8, 3, 2, 1, 7, 6, 9 ],
      label: 'Agriculture',
      color: 'rgba(253,192,0,255)',
      line: false
    },
    {
      data: [ 1.1, 1.2, 1, 2 ,3, 1, 2, 3, 1 ],
      label: 'Construction',
      color: 'rgba(67,188,180,255)',
      line: false
    },
    {
      data: [ 6.4, 7.1, 7, 6, 5, 4, 3, 2, 1 ],
      label: 'Per Capita',
      color: 'rgba(125,151,181,255)',
      line: false
    },
    {
      data: [ 4, 5, 8, 3, 2, 1, 7, 6, 9 ],
      label: 'Non-oil',
      color: 'rgba(226,120,112,255)',
      line: true
    }
  ]

  public annotations: Object[] = []


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
        data: this.data[5].data, 
        type: 'line', 
        label: this.data[5].label, 
        backgroundColor: this.data[5].color, 
        borderColor: this.data[5].color,
        pointBackgroundColor: this.data[5].color,
        pointBorderColor: this.data[5].color,
        pointStyle: 'rect',
        borderDash: [10,5],
        datalabels: {
          labels: {
            
            title: {
              display: false,
              color: 'black',
              align: 'top',
            },
          }
        }
      },
      { data: this.data[0].data, barPercentage: 0.5, label: this.data[0].label, backgroundColor: this.data[0].color },
      { data: this.data[1].data, barPercentage: 0.5, label: this.data[1].label, backgroundColor: this.data[1].color },
      { data: this.data[2].data, barPercentage: 0.5, label: this.data[2].label, backgroundColor: this.data[2].color },
      { data: this.data[3].data, barPercentage: 0.5, label: this.data[3].label, backgroundColor: this.data[3].color },
      // { data: this.data[4].data, barThickness: 80, label: this.data[4].label, backgroundColor: this.data[4].color },
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
