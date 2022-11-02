import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Chart,ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { populationData, populationMonthData } from 'src/app/data/data';

import {default as Annotation} from 'chartjs-plugin-annotation';
import { IData, IOneData } from 'src/app/models/data';

@Component({
  selector: 'app-population',
  templateUrl: './population.component.html',
  styleUrls: ['./population.component.scss']
})
export class PopulationComponent implements OnInit {
  @Input('data') adata: IOneData 

  data: IOneData | null = null
  unemployed: IData = {
    data: [],
    month: [],
    color: '',
    label: '',
    line: false
  }
  workforce: IData = {
    data: [],
    month: [],
    color: '',
    label: '',
    line: false
  }
  salary: IData = {
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
    this.dataset(this.unemployed, this.data, 0)
    this.dataset(this.workforce, this.data, 1)
    this.dataset(this.salary, this.data, 2)

    this.data?.years.data[2].data.forEach((datapoint, index) => {
      this.annotations.push({
        type: 'label',
        xValue: index,
        yValue: 1,
        yScaleID: 'yS',
        backgroundColor: this.data?.years.data[2].color,
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
    this.data?.month.data[2].data.forEach((datapoint, index) => {
      this.monthAnnotations.push({
        type: 'label',
        xValue: index,
        yScaleID: 'yS',
        yValue: 1,
        backgroundColor: this.data?.month.data[2].color,
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

  public annotations: Object[] = []
  public monthAnnotations: Object[] = [
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
      yScaleID: 'yB',
      borderDash: [5,5]
    },
    {
      type: 'line',
      xMin: -0.5,
      xMax: -0.5,
      yScaleID: 'yS',
      borderDash: [5,5]
    }
  ]
  // public data = populationData

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        display: false,
        stacked: true,
        stack: 'stack',
        min: 0,
      },
      yB: {
        display: false,
        stacked: true,
        stack: 'stack',
        offset:true,
        beginAtZero: true,
      },
      yS: {
        display: false,
        stacked: true,
        stack: 'stack',
        offset: true
      },
      x: {
        min: 7,
        max: 8,
        grid: {
          display: false
        },
      },
    },
    layout: {
      padding: {
        top: 20
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
      }
    }
  };
  public monthChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        display: false,
        stacked: true,
        stack: 'stack',
        min: 0,
      },
      yB: {
        display: false,
        stacked: true,
        offset: true,
        stack: 'stack',
        beginAtZero: true,
      },
      yS: {
        display: false,
        stacked: true,
        stack: 'stack',
        offset: true
      },
      x: {
        min: 0,
        max: 1,
        grid: {
          display: false
        },
      },
    },
    layout: {
      padding: {
        top: 20
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


          return value === 0 ? "" : `${value}` ;
        }
      }
    }
  };
  public barChartType: ChartType = 'line';
  public barChartPlugins = [
    DataLabelsPlugin
  ];



  public scroll = (event: WheelEvent, chart: any) => {
    if(this.keyPressed) {

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
    }
    chart.update()
    
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
      { 
        data: this.unemployed.data, 
        barPercentage: .5, 
        label: "Unemployed (k)", 
        backgroundColor: () => this.unemployed.color,
        type: 'bar',
      },
      { 
        data: this.workforce.data, 
        yAxisID: 'yB',
        label: 'Workforce (k)', 
        borderColor: () => this.workforce.color, 
        backgroundColor: () => this.workforce.color, 
        pointBackgroundColor: () => this.workforce.color,
        pointBorderColor: () => this.workforce.color,
        borderDash: [10,4],
        type: 'line',
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
        },
      },
    ],
  };
  public monthChartData: ChartData = {
    labels: this.monthLabelsSet,
    datasets: [
      { 
        data: this.unemployed.month, 
        barPercentage: .5, 
        label: 'Unemployed (k)', 
        backgroundColor: () => this.unemployed.color,
        type: 'bar',
      },
      { 
        data: this.workforce.month, 
        yAxisID: 'yB',
        label: 'Workforce (k)', 
        borderColor: () => this.workforce.color, 
        backgroundColor: () => this.workforce.color, 
        pointBackgroundColor: () => this.workforce.color,
        pointBorderColor: () => this.workforce.color,
        borderDash: [10,4],
        type: 'line',
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
        },
      },
    ],
  };

}
