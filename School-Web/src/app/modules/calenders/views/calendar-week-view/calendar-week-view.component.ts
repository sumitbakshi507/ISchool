import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from 'src/app/models/calendar.event.model';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-week-view',
  templateUrl: './calendar-week-view.component.html',
  styleUrls: ['./calendar-week-view.component.scss']
})
export class CalendarWeekViewComponent implements OnInit {
  @Input() viewDate: Date;
  @Input() events: Array<CalendarEvent>;
  @Input() refresh: Subject<any> = new Subject();
  @Input() activeDayIsOpen: boolean;
  dates: Array<Date>;
  constructor() {
    this.dates = [];
  }

  ngOnInit(): void {
    this.setDates(0);
  }

  setDates(start: number) {
    this.dates = [];
    start = start || 0;
    this.viewDate.setHours(0, 0, 0, 0);
    const day = this.viewDate.getDay() - start;
    const date = this.viewDate.getDate() - day;
        // Grabbing Start/End Dates
    let startDate = (moment(this.viewDate).subtract(moment(this.viewDate).weekday(), 'day'));
    for (let i = 0; i <= 6; i++) {
      this.dates.push(startDate.toDate());
      startDate = (moment(startDate).add(1, 'day'));
    }
  }

  getHours(date: Date) {
    date = (date === undefined) ? new Date() : date;
    const hours: Array<Date> = [];
    date.setHours(0, 0, 0, 0);
    for (let i = 0; i < 24; i++) {
      hours.push(moment(date).add(i, 'hour').toDate());
    }

    return hours;
  }
}
