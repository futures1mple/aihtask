import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit {
  @Input() data: any

  constructor() { }

  getData() {
    let sameData
    sameData = this.data;
    return sameData
  }

  ngOnInit(): void {
    console.log(this.getData())
  }

}
