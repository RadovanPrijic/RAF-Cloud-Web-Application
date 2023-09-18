import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMachineComponent } from './post-machine.component';

describe('PostMachineComponent', () => {
  let component: PostMachineComponent;
  let fixture: ComponentFixture<PostMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostMachineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
