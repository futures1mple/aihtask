import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Component, OnInit, ViewChild } from '@angular/core';
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
        yValue: this.data[1].data[index]*2 + datapoint*2,
        yScaleID: 'yB',
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
