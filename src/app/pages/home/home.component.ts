import { DataService } from './../../services/data.service';
import { ISummaryData } from './../../models/data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: ISummaryData 
  loading: boolean = true

  constructor(
    private dataService: DataService
  ) {}

    getData() {
      this.loading = true
      this.dataService.getData().subscribe( data => {
        this.data = data
        this.loading = false
        console.log(this.data.grossProduct.years.data);
      })
    }

  ngOnInit(): void {
    this.getData()

  }

}
