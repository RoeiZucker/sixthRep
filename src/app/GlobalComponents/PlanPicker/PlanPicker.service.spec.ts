/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlanPickerService } from './PlanPicker.service';

describe('Service: PlanPicker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanPickerService]
    });
  });

  it('should ...', inject([PlanPickerService], (service: PlanPickerService) => {
    expect(service).toBeTruthy();
  }));
});