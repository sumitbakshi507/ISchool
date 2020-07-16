import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CalendarView } from './../../../models/calendar-view.model';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { CalendarEvent } from './../../../models/calendar.event.model';
import { colors } from './../../../models/calendar.event.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Week;
  activeDayIsOpen: boolean;
  CalendarView = CalendarView;
  refresh: Subject<any> = new Subject();
  viewDate: Date = new Date();
  events: Array<CalendarEvent>;
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  constructor() {
    this.activeDayIsOpen = true;
  }

  ngOnInit(): void {
  }

  setView(view: CalendarView) {
    this.view = view;
    this.viewDate.setHours(0, 0, 0, 0);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  today() {
    this.viewDate = new Date();
    this.viewDate.setHours(0, 0, 0, 0);
  }
  previous() {
    switch (this.view) {
      case CalendarView.Day:
        this.viewDate = moment(this.viewDate).subtract(1, 'day').toDate();
        break;
      case CalendarView.Week:
        this.viewDate = moment(this.viewDate).subtract(1, 'week').toDate();
        break;
      case CalendarView.Month:
        this.viewDate = moment(this.viewDate).subtract(1, 'month').toDate();
        break;
    }
  }

  next() {
    switch (this.view) {
      case CalendarView.Day:
        this.viewDate = moment(this.viewDate).add(1, 'day').toDate();
        break;
      case CalendarView.Week:
        this.viewDate = moment(this.viewDate).add(1, 'week').toDate();
        break;
      case CalendarView.Month:
        this.viewDate = moment(this.viewDate).add(1, 'month').toDate();
        break;
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (moment(date) === moment(this.viewDate)) {
      if (
        (this.isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  isSameDay(date1: Date, date2: Date) {
    return moment(date1) === moment(date2);
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: this.startOfDay(new Date()),
        end: this.endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        allDay: false
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  startOfDay(date: Date) {
    return date;
  }

  endOfDay(date: Date) {
    return date;
  }
}
