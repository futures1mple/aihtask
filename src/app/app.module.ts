import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from './components/chart/chart.component';
import { HomeComponent } from './pages/home/home.component';
import { PopulationComponent } from './components/population/population.component';
import { GovBudgetComponent } from './components/gov-budget/gov-budget.component';
import { GrossProductComponent } from './components/gross-product/gross-product.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    HomeComponent,
    PopulationComponent,
    GovBudgetComponent,
    GrossProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
