import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { govBudgetData, govBudgetMonthData } from 'src/app/data/data';

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
  public keyPressed: boolean = false
  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if(event.key === 'Shift') { 
      this.keyPressed = true
    }
  }
  @HostListener('document:keyup', ['$event'])
  handleKeyup(event: KeyboardEvent) { 
    if(event.key === 'Shift') { 
      this.keyPressed = false
    }
  }

  public data = govBudgetData
  public monthData = govBudgetMonthData
  public labels = [ '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022' ]
  private monthLabels = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  private d = new Date();
  private month = this.d.getMonth()
  private year = this.d.getFullYear()

  public mounthLabels = [ `${this.monthLabels[this.month].substring(0,3)} - ${this.year - 1}` , `${this.monthLabels[this.month].substring(0,3)} - ${this.year}`]


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
        min: this.labels.length - 2,
        max: this.labels.length - 1,
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
  public monthChartOptions: ChartConfiguration['options'] = {
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
      annotation: {
        annotations: [
          {
            type: 'line',
            xMin: -0.5,
            xMax: -0.5,
            borderDash: [5,5]
          },
          {
            type: 'line',
            xMin: -0.5,
            xMax: -0.5,
            borderDash: [5,5],
            yScaleID: 'yL'
          }
        ]
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
    if(this.keyPressed) {

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
    
  }
  public buttonScroll = (left: boolean, chart: any) => {
    const dataLength = chart.chart.data.labels.length
    if(!left) {
      if(chart.chart.config.options.scales.x.max >= dataLength - 1) {
        chart.chart.config.options.scales.x.min = dataLength - 2
        chart.chart.config.options.scales.x.max = dataLength - 1
      } else {
        chart.chart.config.options.scales.x.min += 1
        chart.chart.config.options.scales.x.max += 1
      }
    } else {
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
    labels: this.labels,
    datasets: [
      { 
        data: this.data[0].data, 
        label: this.data[0].label, 
        backgroundColor: this.data[0].color,
        stack: 'combined',
      },
      { 
        data: this.data[1].data, 
        label: this.data[1].label, 
        backgroundColor: this.data[1].color, 

      },
      { 
        data: this.data[2].data, 
        label: this.data[2].label, 
        yAxisID: 'yL',
        borderColor: this.data[2].color, 
        backgroundColor: this.data[2].color,
        pointBackgroundColor: this.data[2].color,
        borderDash: [10,4],
        pointBorderColor: this.data[2].color,
        type: 'line',
        stack: 'combined',
        pointStyle: 'rect',
        datalabels: {
          labels: {
            title: {
              textStrokeColor:'grey',
              borderColor: 'grey',
              align: 'bottom',
              color: 'black'
            }
          }
        }
      },
      { 
        data: this.data[3].data, 
        label: this.data[3].label, 
        yAxisID: 'yL',
        borderColor: this.data[3].color, 
        backgroundColor: this.data[3].color,
        pointBackgroundColor: this.data[3].color,
        pointBorderColor: this.data[3].color,
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
    ],
  };
  public monthChartData: ChartData = {
    labels: this.mounthLabels,
    datasets: [
      { 
        data: this.monthData[0].data, 
        label: this.monthData[0].label, 
        backgroundColor: this.monthData[0].color,
        stack: 'combined',
      },
      { 
        data: this.monthData[1].data, 
        label: this.monthData[1].label, 
        backgroundColor: this.monthData[1].color, 

      },
      { 
        data: this.monthData[2].data, 
        label: this.monthData[2].label, 
        yAxisID: 'yL',
        borderColor: this.monthData[2].color, 
        backgroundColor: this.monthData[2].color,
        pointBackgroundColor: this.monthData[2].color,
        borderDash: [10,4],
        pointBorderColor: this.monthData[2].color,
        type: 'line',
        stack: 'combined',
        pointStyle: 'rect',
        datalabels: {
          labels: {
            title: {
              textStrokeColor:'grey',
              borderColor: 'grey',
              align: 'bottom',
              color: 'black'
            }
          }
        }
      },
      { 
        data: this.monthData[3].data, 
        label: this.monthData[3].label, 
        yAxisID: 'yL',
        borderColor: this.monthData[3].color, 
        backgroundColor: this.monthData[3].color,
        pointBackgroundColor: this.monthData[3].color,
        pointBorderColor: this.monthData[3].color,
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
    ],
  };

}
