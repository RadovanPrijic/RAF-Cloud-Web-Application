import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleMachineComponent } from './schedule-machine.component';

describe('ScheduleMachineComponent', () => {
  let component: ScheduleMachineComponent;
  let fixture: ComponentFixture<ScheduleMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleMachineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
