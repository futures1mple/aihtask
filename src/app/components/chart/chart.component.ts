import { IData, IOneData } from './../../models/data';
import { currencyData, currencyMonthData } from './../../data/data';
import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input('data') adata: IOneData 

  data: IOneData | null = null
  monthData: IOneData | null = null
  sofaz: IData = {
    data: [],
    month: [],
    color: '',
    label: '',
    line: false
  }
  cbar: IData = {
    data: [],
    month: [],
    color: '',
    label: '',
    line: false
  }
  mof: IData = {
    data: [],
    month: [],
    color: '',
    label: '',
    line: true
  }

  labelsSet: string[] =[]
  monthLabelsSet: string[] =[]

  dataset(array: IData, data: any, index: number){

    data.month.data[index].data.map((item: any) => {
      array.month.push(item)
    })
    data.years.data[index].data.map((item: any) => {
      array.data.push(item)
    })
    array.color = data.years.data[index].color
  }
  constructor() {

  }
  

  ngOnInit(): void {
    this.data = this.adata
    this.data.years.labels.map((item: any) => {
      this.labelsSet.push(item)
    })
    this.data.month.labels.map((item: any) => {
      this.monthLabelsSet.push(item)
    })
    this.dataset(this.sofaz, this.data, 0)
    this.dataset(this.cbar, this.data, 1)
    this.dataset(this.mof, this.data, 2)
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

  // public data = currencyData
  // public monthData = currencyMonthData
  
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      
      x: {
        min: 7,
        max: 8,
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
    labels: this.labelsSet,
    datasets: [
      { data: this.sofaz.data, barPercentage: .5, label: 'Sofaz', backgroundColor: () => this.sofaz.color },
      { data: this.cbar.data, barPercentage: .5, label: 'Cbar', backgroundColor: () => this.cbar.color },
      { data: this.mof.data, barPercentage: .5, label: 'Mof', backgroundColor: () => this.mof.color },
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

  public mounthChartData : ChartData = {
    labels: this.monthLabelsSet,
    datasets: [
      { data: this.sofaz.month, barPercentage: .5, label: 'Sofaz', backgroundColor: () => this.sofaz.color },
      { data: this.sofaz.month, barPercentage: .5, label: 'Cbar', backgroundColor:() => this.cbar.color },
      { data: this.sofaz.month, barPercentage: .5, label: 'Mof', backgroundColor:() => this.mof.color },
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
  }
}
