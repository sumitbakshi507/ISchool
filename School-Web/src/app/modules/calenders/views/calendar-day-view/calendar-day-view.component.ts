import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from 'src/app/models/calendar.event.model';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-day-view',
  templateUrl: './calendar-day-view.component.html',
  styleUrls: ['./calendar-day-view.component.scss']
})
export class CalendarDayViewComponent implements OnInit {
  @Input() viewDate: Date;
  @Input() events: Array<CalendarEvent>;
  @Input() refresh: Subject<any> = new Subject();
  @Input() activeDayIsOpen: boolean;
  constructor() { }

  ngOnInit(): void {
    console.log('CalendarDayViewComponent');
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
