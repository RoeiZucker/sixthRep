/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SimPickerService } from './SimPicker.service';

describe('Service: SimPicker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimPickerService]
    });
  });

  it('should ...', inject([SimPickerService], (service: SimPickerService) => {
    expect(service).toBeTruthy();
  }));
});