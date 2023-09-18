import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMachinesComponent } from './get-machines.component';

describe('GetMachinesComponent', () => {
  let component: GetMachinesComponent;
  let fixture: ComponentFixture<GetMachinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetMachinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
