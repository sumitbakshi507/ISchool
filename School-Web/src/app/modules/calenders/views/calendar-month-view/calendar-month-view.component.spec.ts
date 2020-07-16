import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMonthViewComponent } from './calendar-month-view.component';

describe('CalendarMonthViewComponent', () => {
  let component: CalendarMonthViewComponent;
  let fixture: ComponentFixture<CalendarMonthViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarMonthViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarMonthViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
