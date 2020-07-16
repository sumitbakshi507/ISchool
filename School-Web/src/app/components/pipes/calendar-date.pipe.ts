import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { CalendarView } from './../../models/calendar-view.model';

@Pipe({name: 'calendarDate'})
export class CalendarDatePipe implements PipeTransform {
  transform(value: Date, calendarView: CalendarView): string {
    let label = '';
    switch (calendarView) {
      case CalendarView.Month:
        label = moment(value).format('MMM, YYYY');
        break;
      case CalendarView.Week:
        label = this.getWeekLabel(value, 0);
        break;
      case CalendarView.Day:
        label = moment(value).format('dddd MMM DD, YYYY');
        break;
      default: break;
    }
    return label;
  }

  getWeekLabel(currentDate: Date, start: number) {
    start = start || 0;
    currentDate.setHours(0, 0, 0, 0);
    const day = currentDate.getDay() - start;
    const date = currentDate.getDate() - day;
        // Grabbing Start/End Dates
    const startDate = (moment(currentDate).subtract(moment(currentDate).weekday(), 'day'));
    const endDate = moment(currentDate).add(6 - moment(currentDate).weekday() , 'day');
    const label = startDate.format('D') + ' ' + startDate.format('MMM')
                  + ' - ' + endDate.format('D') + ' ' + endDate.format('MMM') + ', ' + endDate.format('YY');
    return label;
  }
}
