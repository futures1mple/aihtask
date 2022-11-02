import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { IData, IOneData } from 'src/app/models/data';

@Component({
  selector: 'app-gov-budget',
  templateUrl: './gov-budget.component.html',
  styleUrls: ['./gov-budget.component.scss']
})
export class GovBudgetComponent implements OnInit {
  @Input('data') adata: IOneData 

  data: IOneData | null = null
  income: IData = {
    data: [],
    month: [],
    color: '',
    label: '',
    line: false
  }
  spending: IData = {
    data: [],
    month: [],
    color: '',
    label: '',
    line: false
  }
  export: IData = {
    data: [],
    month: [],
    color: '',
    label: '',
    line: true
  }
  import: IData = {
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
  constructor() { }

  ngOnInit(): void {
    this.data = this.adata
    this.data.years.labels.map((item: any) => {
      this.labelsSet.push(item)
    })
    this.data.month.labels.map((item: any) => {
      this.monthLabelsSet.push(item)
    })
    this.dataset(this.income, this.data, 0)
    this.dataset(this.spending, this.data, 1)
    this.dataset(this.export, this.data, 2)
    this.dataset(this.import, this.data, 3)
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

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
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
    maintainAspectRatio: false,
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

  public barChartData: ChartData = {
    labels: this.labelsSet,
    datasets: [
      { 
        data: this.income.data, 
        label: 'Income', 
        backgroundColor: () => this.income.color,
        stack: 'combined',
      },
      { 
        data: this.spending.data, 
        label: 'Spending', 
        backgroundColor: () => this.spending.color, 

      },
      { 
        data: this.export.data, 
        label: 'Export', 
        yAxisID: 'yL',
        borderColor: () => this.export.color, 
        backgroundColor: () => this.export.color,
        pointBackgroundColor: () => this.export.color,
        borderDash: [10,4],
        pointBorderColor: () => this.export.color,
        type: 'line',
        stack: 'combined',
        pointStyle: 'rect',
        datalabels: {
          labels: {
            title: {
              align: 'bottom',
              color: 'black'
            }
          }
        }
      },
      { 
        data: this.import.data, 
        label: 'Import', 
        yAxisID: 'yL',
        borderColor: () => this.import.color, 
        backgroundColor: () => this.import.color,
        pointBackgroundColor: () => this.import.color,
        pointBorderColor: () => this.import.color,
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
    labels: this.monthLabelsSet,
    datasets: [
      { 
        data: this.income.month, 
        label: "Income", 
        backgroundColor: () => this.income.color,
        stack: 'combined',
      },
      { 
        data: this.spending.month, 
        label: "Spending", 
        backgroundColor: () => this.spending.color, 

      },
      { 
        data: this.export.month, 
        label: 'Export', 
        yAxisID: 'yL',
        borderColor: () => this.export.color, 
        backgroundColor: () => this.export.color,
        pointBackgroundColor: () => this.export.color,
        borderDash: [10,4],
        pointBorderColor: () => this.export.color,
        type: 'line',
        stack: 'combined',
        pointStyle: 'rect',
        datalabels: {
          labels: {
            title: {
              align: 'bottom',
              color: 'black'
            }
          }
        }
      },
      { 
        data: this.import.month, 
        label: 'Import', 
        yAxisID: 'yL',
        borderColor: () => this.import.color, 
        backgroundColor: () => this.import.color,
        pointBackgroundColor: () => this.import.color,
        pointBorderColor: () => this.import.color,
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
