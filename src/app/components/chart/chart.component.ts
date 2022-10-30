import { currencyData, currencyMonthData } from './../../data/data';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor() {

  }
  

  ngOnInit(): void {
    
  }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public data = currencyData
  public monthData = currencyMonthData
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
    labels: this.labels,
    datasets: [
      { data: this.data[0].data, barPercentage: .5, label: this.data[0].label, backgroundColor: this.data[0].color },
      { data: this.data[1].data, barPercentage: .5, label: this.data[1].label, backgroundColor: this.data[1].color },
      { data: this.data[2].data, barPercentage: .5, label: this.data[2].label, backgroundColor: this.data[2].color },
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
    labels: this.mounthLabels,
    datasets: [
      { data: this.monthData[0].data, barPercentage: .5, label: this.monthData[0].label, backgroundColor: this.monthData[0].color },
      { data: this.monthData[1].data, barPercentage: .5, label: this.monthData[1].label, backgroundColor: this.monthData[1].color },
      { data: this.monthData[2].data, barPercentage: .5, label: this.monthData[2].label, backgroundColor: this.monthData[2].color },
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
