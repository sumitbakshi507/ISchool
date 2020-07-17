import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from 'src/app/models/calendar.event.model';
import { Subject } from 'rxjs';
import * as moment from 'moment';

export class IRowData {
  rowNumber: number;
  rowDates: Array<Date>;
  constructor(
    rowNumber: number,
    rowDates: Array<Date>) {
      this.rowNumber = rowNumber;
      this.rowDates = rowDates;
    }
}

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
  dates: Array<Date>;
  numberOfRows: number;
  rowData: Array<IRowData>;
  constructor() {
    this.numberOfRows = 0;
    this.rowData = [];
  }

  ngOnInit(): void {
    this.setDates(0);
    this.buildRowCol();
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

  buildRowCol() {
    const firstDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
    firstDay.setHours(0, 0, 0, 0);
    const momentDate = moment(firstDay);
    console.log(moment(momentDate.format('YYYY-MM'), 'YYYY-MM').daysInMonth());
    const maxDays: number = moment(momentDate.format('YYYY-MM'), 'YYYY-MM').daysInMonth();
    let lastFetch: Array<Date> = [];
    for (let i = 1; i <= maxDays; i++) {
      const dateCounter = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), i);
      const fetchDates = this.getDates(dateCounter, 0);
      if (moment(lastFetch[0]).format('YYYY-MM-DD') !== moment(fetchDates[0]).format('YYYY-MM-DD')) {
        lastFetch = fetchDates;
        this.rowData.push(new IRowData(this.rowData.length, fetchDates));
      }
    }
  }

  getDates(weekStart: Date, start: number) {
    const weekDates: Array<Date> = [];
    start = start || 0;
    weekStart.setHours(0, 0, 0, 0);
    const day = weekStart.getDay() - start;
    const date = weekStart.getDate() - day;
        // Grabbing Start/End Dates
    let startDate = (moment(weekStart).subtract(moment(weekStart).weekday(), 'day'));
    for (let i = 0; i <= 6; i++) {
      weekDates.push(startDate.toDate());
      startDate = (moment(startDate).add(1, 'day'));
    }

    return weekDates;
  }
}
