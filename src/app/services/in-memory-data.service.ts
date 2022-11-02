import { ISummaryData } from './../models/data';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';


@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  monthLabels = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  date = new Date()
  createDb() {
    const data = {
      grossProduct: {
        years: {
          labels: [ '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022' ],
          data: [
            {
              data: Array.from({length: 9}, () => Math.floor(Math.random() * 10)),
              label: 'Construction',
              color: 'rgba(67,188,180,255)',
              line: false
            },
            {
              data: Array.from({length: 9}, () => Math.floor(Math.random() * 10)),
              label: 'Agriculture',
              color: 'rgba(253,192,0,255)',
              line: false
            },
            {
              data: Array.from({length: 9}, () => Math.floor(Math.random() * 10)),
              label:'ItAndTelecom',
              color: 'rgba(95,155,216,255)',
              line: false
            },
            {
              data: Array.from({length: 9}, () => Math.floor(Math.random() * 10)),
              label: 'Other',
              color: 'rgba(142,189,100,255)',
              line: false
            },
            {
              data: Array.from({length: 9}, () => Math.floor(Math.random() * 10)),
              label: 'Non-oil',
              color: 'rgba(226,120,112,255)',
              line: true
            },
            {
              data: Array.from({length: 9}, () => Math.floor(Math.random() * 10)),
              label: 'Per Capita',
              color: 'rgba(125,151,181,255)',
              line: false
            },
          ]
        },
        month: {
          labels:[ `${this.monthLabels[this.date.getMonth()].substring(0,3)} - ${this.date.getFullYear() - 1}` , `${this.monthLabels[this.date.getMonth()].substring(0,3)} - ${this.date.getFullYear()}`],
          data: [
            {
              data: Array.from({length: 2}, () => Math.floor(Math.random() * 10)),
              label: 'Construction',
              color: 'rgba(67,188,180,255)',
              line: false
            },
            {
              data: Array.from({length: 2}, () => Math.floor(Math.random() * 10)),
              label: 'Agriculture',
              color: 'rgba(253,192,0,255)',
              line: false
            },
            {
              data: Array.from({length: 2}, () => Math.floor(Math.random() * 10)),
              label:'ItAndTelecom',
              color: 'rgba(95,155,216,255)',
              line: false
            },
            {
              data: Array.from({length: 2}, () => Math.floor(Math.random() * 10)),
              label: 'Other',
              color: 'rgba(142,189,100,255)',
              line: false
            },
            {
              data: Array.from({length: 2}, () => Math.floor(Math.random() * 10)),
              label: 'Non-oil',
              color: 'rgba(226,120,112,255)',
              line: true
            },
            {
              data: Array.from({length: 2}, () => Math.floor(Math.random() * 10)),
              label: 'Per Capita',
              color: 'rgba(125,151,181,255)',
              line: false
            },
          ]
        }
      },
      govBudget: {
        years: {
          labels: [ '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022' ],
          data: [
            {
              data: Array.from({length: 9}, () => Math.floor(Math.random() * 10)),
              label: 'Income',
              color: 'rgba(52,125,160,255)',
              line: false
            },
            {
              data: Array.from({length: 9}, () => Math.floor(Math.random() * 10)),
              label:'Spending',
              color: 'rgba(226,120,112,255)',
              line: false
            },
            {
              data: Array.from({length: 9}, () => Math.floor(Math.random() * 10)),
              label: 'Export',
              color: 'red',
              line: true
            },
            {
              data: Array.from({length: 9}, () => Math.floor(Math.random() * 10)),
              label: 'Import',
              color: 'green',
              line: true
            }
          ],
        },
        month: {
          labels: [ `${this.monthLabels[this.date.getMonth()].substring(0,3)} - ${this.date.getFullYear() - 1}` , `${this.monthLabels[this.date.getMonth()].substring(0,3)} - ${this.date.getFullYear()}`],
          data: [
            {
              data: Array.from({length: 2}, () => Math.floor(Math.random() * 10)),
              label: 'Income',
              color: 'rgba(52,125,160,255)',
              line: false
            },
            {
              data: Array.from({length: 2}, () => Math.floor(Math.random() * 10)),
              label:'Spending',
              color: 'rgba(226,120,112,255)',
              line: false
            },
            {
              data: Array.from({length: 2}, () => Math.floor(Math.random() * 10)),
              label: 'Export',
              color: 'red',
              line: true
            },
            {
              data: Array.from({length: 2}, () => Math.floor(Math.random() * 10)),
              label: 'Import',
              color: 'green',
              line: true
            }
          ],
        }
      },
      currency: {
        years: {
          labels: [ '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022' ],
          data: [
            {
              data: Array.from({length: 9}, () => Math.floor(Math.random() * 30)),
              label: 'Sofaz',
              color: 'rgba(52,125,160,255)',
              line: false
            },
            {
              data: Array.from({length: 9}, () => Math.floor(Math.random() * 20)),
              label:'Cbar',
              color: 'rgba(226,120,112,255)',
              line: false
            },
            {
              data: Array.from({length: 9}, () => Math.floor(Math.random() * 10)),
              label: 'Mof',
              color: 'rgba(67,188,180,255)',
              line: false
            }
          ],
        },
        month: {
          labels: [ `${this.monthLabels[this.date.getMonth()].substring(0,3)} - ${this.date.getFullYear() - 1}` , `${this.monthLabels[this.date.getMonth()].substring(0,3)} - ${this.date.getFullYear()}`],
          data: [
            {
              data: Array.from({length: 2}, () => Math.floor(Math.random() * 30)),
              label: 'Sofaz',
              color: 'rgba(52,125,160,255)',
              line: false
            },
            {
              data: Array.from({length: 2}, () => Math.floor(Math.random() * 20)),
              label:'Cbar',
              color: 'rgba(226,120,112,255)',
              line: false
            },
            {
              data: Array.from({length: 2}, () => Math.floor(Math.random() * 10)),
              label: 'Mof',
              color: 'rgba(67,188,180,255)',
              line: false
            }
          ],
        }
      },
      population: {
        years: {
          labels: [ '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022' ],
          data: [
            {
              data: Array.from({length: 9}, () => Math.floor(Math.random() * 100)),
              label: 'Unemployed (k)',
              color: 'rgba(52,125,160,255)',
              line: false
            },
            {
              data: Array.from({length: 9}, () => Math.floor(Math.random() * 100)),
              label:'Workforce (k)',
              color: 'rgba(226,120,112,255)',
              line: true,
            },
            {
              data: Array.from({length: 9}, () => Math.floor(Math.random() * 100)),
              label: 'Salary(₼)',
              color: 'rgba(125,151,181,255)',
              line: false,
            }
          ],
        },
        month: {
          labels: [ `${this.monthLabels[this.date.getMonth()].substring(0,3)} - ${this.date.getFullYear() - 1}` , `${this.monthLabels[this.date.getMonth()].substring(0,3)} - ${this.date.getFullYear()}`],
          data: [
            {
              data: Array.from({length: 2}, () => Math.floor(Math.random() * 100)),
              label: 'Unemployed (k)',
              color: 'rgba(52,125,160,255)',
              line: false
            },
            {
              data: Array.from({length: 2}, () => Math.floor(Math.random() * 100)),
              label:'Workforce (k)',
              color: 'rgba(226,120,112,255)',
              line: true,
            },
            {
              data: Array.from({length: 2}, () => Math.floor(Math.random() * 100)),
              label: 'Salary(₼)',
              color: 'rgba(125,151,181,255)',
              line: false,
            }
          ],
        }
      },
    } 
    return {data};
  }
  
}