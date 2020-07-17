import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppMaterialModule } from '../../app-material.module';
import { CalendarDatePipe } from 'src/app/components/pipes/calendar-date.pipe';
import { CalendarWeekViewComponent } from './views/calendar-week-view/calendar-week-view.component';
import { CalendarDayViewComponent } from './views/calendar-day-view/calendar-day-view.component';
import { CalendarMonthViewComponent } from './views/calendar-month-view/calendar-month-view.component';
import { FormatDatePipe } from 'src/app/components/pipes/format-date.pipe';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
  ]
}];

@NgModule({
  declarations: [
    HomeComponent,
    CalendarDatePipe,
    FormatDatePipe,
    CalendarWeekViewComponent,
    CalendarDayViewComponent,
    CalendarMonthViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    AppMaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class CalendersModule { }
