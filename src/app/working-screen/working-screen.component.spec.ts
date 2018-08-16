import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingScreenComponent } from './working-screen.component';

describe('WorkingScreenComponent', () => {
  let component: WorkingScreenComponent;
  let fixture: ComponentFixture<WorkingScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
