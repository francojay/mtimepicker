import { TestBed } from '@angular/core/testing';

import { MtimepickerService } from './mtimepicker.service';

describe('MtimepickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MtimepickerService = TestBed.get(MtimepickerService);
    expect(service).toBeTruthy();
  });
});
