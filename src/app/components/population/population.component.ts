import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Chart,ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { populationData, populationMonthData } from 'src/app/data/data';

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
        yValue: 1,
        yScaleID: 'yS',
        backgroundColor: this.data[2].color,
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
    this.monthData[2].data.forEach((datapoint, index) => {
      this.monthAnnotations.push({
        type: 'label',
        xValue: index,
        yScaleID: 'yS',
        yValue: 1,
        backgroundColor: this.monthData[2].color,
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
  public data = populationData
  public monthData = populationMonthData
  public labels = [ '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022' ]
  private monthLabels = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  private d = new Date();
  private month = this.d.getMonth()
  private year = this.d.getFullYear()

  public mounthLabels = [ `${this.monthLabels[this.month].substring(0,3)} - ${this.year - 1}` , `${this.monthLabels[this.month].substring(0,3)} - ${this.year}`]


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
        min: this.labels.length - 2,
        max: this.labels.length - 1,
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
    labels: this.labels,
    datasets: [
      { 
        data: this.data[0].data, 
        barPercentage: .5, 
        label: this.data[0].label, 
        backgroundColor: this.data[0].color,
        type: 'bar',
      },
      { 
        data: this.data[1].data, 
        yAxisID: 'yB',
        label: this.data[1].label, 
        borderColor: this.data[1].color, 
        backgroundColor: this.data[1].color, 
        pointBackgroundColor: this.data[1].color,
        pointBorderColor: this.data[1].color,
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
    labels: this.mounthLabels,
    datasets: [
      { 
        data: this.monthData[0].data, 
        barPercentage: .5, 
        label: this.monthData[0].label, 
        backgroundColor: this.monthData[0].color,
        type: 'bar',
      },
      { 
        data: this.monthData[1].data, 
        yAxisID: 'yB',
        label: this.monthData[1].label, 
        borderColor: this.monthData[1].color, 
        backgroundColor: this.monthData[1].color, 
        pointBackgroundColor: this.monthData[1].color,
        pointBorderColor: this.monthData[1].color,
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
