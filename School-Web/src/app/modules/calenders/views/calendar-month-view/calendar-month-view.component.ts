import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from 'src/app/models/calendar.event.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calendar-month-view',
  templateUrl: './calendar-month-view.component.html',
  styleUrls: ['./calendar-month-view.component.scss']
})
export class CalendarMonthViewComponent implements OnInit {
  @Input() viewDate: Date;
  @Input() events: Array<CalendarEvent>;
  @Input() refresh: Subject<any> = new Subject();
  @Input() activeDayIsOpen: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
