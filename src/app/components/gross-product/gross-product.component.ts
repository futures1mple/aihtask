import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {default as Annotation} from 'chartjs-plugin-annotation';
import { grossProductMonthData, grossProductData } from 'src/app/data/data';

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
    this.sum.map((data, index) => {
      this.data.map((data1, index1) => {
        if(index1 != 4) {
          this.sum[index] += data1.data[index]
        }
      })
    })
    this.data[4].data.forEach((datapoint, index) => {
      this.annotations.push({
        type: 'label',
        xValue: index,
        yValue: this.sum[index] + 5.5,
        backgroundColor: this.data[4].color,
        color: 'white',
        content: `${datapoint}`,
        padding: 10,
        font: {
          size: 14
        }
      })
    })


    this.monthSum.map((data, index) => {
      this.monthData.map((data1, index1) => {
        if(index1 != 4) {
          this.monthSum[index] += data1.data[index]
        }
      })
    })
    this.monthData[4].data.forEach((datapoint, index) => {
      this.monthAnnotations.push({
        type: 'label',
        xValue: index,
        yValue: this.monthSum[index] + 5.5,
        backgroundColor: this.monthData[4].color,
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


  public sum: number[] = [0,0,0,0,0,0,0,0,0]
  public monthSum: number[] = [0,0,0,0,0,0,0,0,0]

  public data = grossProductData

  public annotations: Object[] = []
  public monthAnnotations: Object[] = []

  public monthData = grossProductMonthData
  public labels = [ '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022' ]
  private monthLabels = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  private d = new Date();
  private month = this.d.getMonth()
  private year = this.d.getFullYear()

  public mounthLabels = [ `${this.monthLabels[this.month].substring(0,3)} - ${this.year - 1}` , `${this.monthLabels[this.month].substring(0,3)} - ${this.year}`]

  public monthChartOptions: ChartConfiguration['options'] = {
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
    layout: {
      padding: {
        top: 30
      }
    },
    plugins: {
      annotation: {
        annotations: this.monthAnnotations
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
  }


  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,

    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      
      x: {
        min: this.labels.length - 2,
        max: this.labels.length - 1,
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
    layout: {
      padding: {
        top: 30
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

  public barChartData: ChartData = {
    labels: this.labels,
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
    ],
  };
  public monthChartData: ChartData = {
    labels: this.mounthLabels,
    datasets: [
      { 
        data: this.monthData[5].data, 
        type: 'line', 
        label: this.monthData[5].label, 
        backgroundColor: this.monthData[5].color, 
        borderColor: this.monthData[5].color,
        pointBackgroundColor: this.monthData[5].color,
        pointBorderColor: this.monthData[5].color,
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
      { data: this.monthData[0].data, barPercentage: 0.5, label: this.monthData[0].label, backgroundColor: this.monthData[0].color },
      { data: this.monthData[1].data, barPercentage: 0.5, label: this.monthData[1].label, backgroundColor: this.monthData[1].color },
      { data: this.monthData[2].data, barPercentage: 0.5, label: this.monthData[2].label, backgroundColor: this.monthData[2].color },
      { data: this.monthData[3].data, barPercentage: 0.5, label: this.monthData[3].label, backgroundColor: this.monthData[3].color },
      { 
        data: [ 0, 0 ], 
        
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
    ],
  };
}
