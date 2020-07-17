import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { CalendarView } from './../../models/calendar-view.model';

@Pipe({name: 'formatDate'})
export class FormatDatePipe implements PipeTransform {
  transform(value: Date, format: string): string {
    return moment(value).format(format);
  }
}
