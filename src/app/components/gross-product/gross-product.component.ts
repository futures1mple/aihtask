import { IData, IOneData } from './../../models/data';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {default as Annotation} from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-gross-product',
  templateUrl: './gross-product.component.html',
  styleUrls: ['./gross-product.component.scss']
})
export class GrossProductComponent implements OnInit {
  @Input('data') adata: IOneData 

  data: IOneData | null = null
  nonOil: IData = {
    data: [],
    month: [],
    color: '',
    label: '',
    line: false
  }
  construction: IData = {
    data: [],
    month: [],
    color: '',
    label: '',
    line: false
  }
  agriculture: IData = {
    data: [],
    month: [],
    color: '',
    label: '',
    line: false
  }
  itTelecom: IData = {
    data: [],
    month: [],
    color: '',
    label: '',
    line: false
  }
  other: IData = {
    data: [],
    month: [],
    color: '',
    label: '',
    line: false
  }

  labelsSet: string[] =[]
  monthLabelsSet: string[] =[]

  constructor() { 
    Chart.register(Annotation)
  }


  ngOnInit(): void {
    this.data = this.adata

    this.data.years.labels.map((item: any) => {
      this.labelsSet.push(item)
    })
    this.data.month.labels.map((item: any) => {
      this.monthLabelsSet.push(item)
    })

    this.dataset(this.construction, this.data, 0)
    this.dataset(this.agriculture, this.data, 1)
    this.dataset(this.itTelecom, this.data, 2)
    this.dataset(this.other, this.data, 3)
    this.dataset(this.nonOil, this.data, 4)

    this.data?.years.data[5].data.forEach((datapoint: any, index: any) => {
      this.annotations.push({
        type: 'label',
        xValue: index,
        yValue: 1,
        yScaleID: 'yS',
        backgroundColor: this.data?.years.data[5].color,
        color: 'white',
        content: `${datapoint}`,
        padding: {
          top: 8,
          bottom: 8,
          left: 20,
          right: 20,
        },
        font: {
          size: 14
        }
      })
    })
    this.data?.month.data[5].data.forEach((datapoint: any, index: any) => {
      this.monthAnnotations.push({
        type: 'label',
        xValue: index,
        yValue: 1,
        yScaleID: 'yS',
        backgroundColor: this.data?.month.data[5].color,
        color: 'white',
        content: `${datapoint}`,
        padding: {
          top: 8,
          bottom: 8,
          left: 15,
          right: 15,
        },
        font: {
          size: 14
        }
      })
    })

    this.chart?.render()
  }

  dataset(array: any, data: any, index: number){
    data.month.data[index].data.map((item: any) => {
      array.month.push(item)
    })
    data.years.data[index].data.map((item: any) => {
      array.data.push(item)
    })
    array.color = data.years.data[index].color
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


  public annotations: Object[] = []
  public monthAnnotations: Object[] = [
    {
      type: 'line',
      xMin: -0.5,
      xMax: -0.5,
      borderDash: [5,5],
    },
    {
      type: 'line',
      xMin: -0.5,
      xMax: -0.5,
      yScaleID: 'yS',
      borderDash: [5,5]
    },
  ]

  
  public monthChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      y: {
        display: false,
        stacked: true,
        stack: 'stack',
      },
      yS: {
        display: false,
        stacked: true,
        stack: 'stack',
        offset: true,
        beginAtZero: true,
      },
      x: {
        min: 0,
        max: 1,
        stacked: true,
        grid: {
          display: false
        }
      },
    },
    layout: {
      padding: {
        top: 30
      }
    },
    plugins: {
      annotation: {
        annotations: this.monthAnnotations,
      },
      legend: {
        display: false,
        align: "start",
      },
      datalabels: {
        labels: {
          title: {
            color: 'white',
            font: {
              size: 10
            }
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
    maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      y: {
        display: false,
        stacked: true,
        stack: 'stack',
      },
      yS: {
        display: false,
        stacked: true,
        stack: 'stack',
        offset: true,
        beginAtZero: true,
      },
      x: {
        stacked: true,
        grid: {
          display: false
        }
      },
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

  public barChartData: ChartData = {
    labels: this.labelsSet,
    datasets: [
      { 
        data: this.nonOil.data , 
        type: 'line', 
        label: "Non-oil",
        backgroundColor: () => this.nonOil.color, 
        borderColor: () => this.nonOil.color, 
        pointBackgroundColor: () => this.nonOil.color, 
        pointBorderColor: () => this.nonOil.color, 
        pointStyle: 'rect',
        borderDash: [5,5],
        datalabels: {
          labels: {
            title: {
              display: false,
              align: 'top',
            },
          }
        }
      },
      { data: this.construction.data, barPercentage: 0.5, label: 'Construction', backgroundColor: () => this.construction.color },
      { data: this.agriculture.data, barPercentage: 0.5, label: 'Agriculture', backgroundColor: () => this.agriculture.color },
      { data: this.itTelecom.data, barPercentage: 0.5, label: 'It and Telecom', backgroundColor: () => this.itTelecom.color },
      { data: this.other.data, barPercentage: 0.5, label: 'Other', backgroundColor: () => this.other.color },
      { 
        data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
        
        datalabels: {
          align: 'top',
          anchor: 'end',
          labels: {
            title: {
              color: 'black'
            }
          },
          formatter: (value, context) => {
            const sumValue = context.chart.config.data.datasets.map((datapoint)=>{
              return datapoint.data[context.dataIndex]
            })
            function totalSum (total: any, datapoint: any) {
              return total + datapoint
            }
            const sum = sumValue.reduce(totalSum,0)

            return Math.floor(sum * 100) / 100 ;
          }
        },
        label: '',
        borderColor: 'transparent',
        backgroundColor:'transparent'
      }
    ],
  };
  public monthChartData: ChartData = {
    labels: this.monthLabelsSet,
    datasets: [
      
      { 
        data: this.nonOil.month , 
        type: 'line', 
        label: 'Non-oil',
        backgroundColor: () => this.nonOil.color, 
        borderColor: () => this.nonOil.color, 
        pointBackgroundColor: () => this.nonOil.color, 
        pointBorderColor: () => this.nonOil.color, 
        pointStyle: 'rect',
        borderDash: [5,5],
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
      { data: this.construction.month, barPercentage: 0.5, label: 'Construction', backgroundColor: () => this.construction.color },
      { data: this.agriculture.month, barPercentage: 0.5, label: 'Agriculture', backgroundColor: () => this.agriculture.color },
      { data: this.itTelecom.month, barPercentage: 0.5, label: 'It and Telecom', backgroundColor: () => this.itTelecom.color },
      { data: this.other.month, barPercentage: 0.5, label: 'Other', backgroundColor: () => this.other.color },
      { 
        data: [ 0, 0 ], 
        
        datalabels: {
          align: 'top',
          anchor: 'end',
          labels: {
            title: {
              color: 'black'
            }
          },
          formatter: (value, context) => {
            const sumValue = context.chart.config.data.datasets.map((datapoint)=>{
              return datapoint.data[context.dataIndex]
            })
            function totalSum (total: any, datapoint: any) {
              return total + datapoint
            }
            const sum = sumValue.reduce(totalSum,0)

            return Math.floor(sum * 100) / 100 ;
          }
        },
        label: '',
        borderColor: 'transparent',
        backgroundColor:'transparent'
      }
    ],
  };
}
