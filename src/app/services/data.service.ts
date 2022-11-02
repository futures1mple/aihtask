import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IData, ISummaryData } from '../models/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = 'api/data/'
  
  constructor(
    private http: HttpClient,
  ) { }
  

  getData(): Observable<ISummaryData> {
    return this.http.get<ISummaryData>(this.dataUrl)
  }

}
