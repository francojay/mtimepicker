import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtimepickerComponent } from './mtimepicker.component';

describe('MtimepickerComponent', () => {
  let component: MtimepickerComponent;
  let fixture: ComponentFixture<MtimepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtimepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
