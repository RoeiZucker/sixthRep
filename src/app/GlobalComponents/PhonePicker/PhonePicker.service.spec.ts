/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PhonePickerService } from './PhonePicker.service';

describe('Service: PhonePicker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhonePickerService]
    });
  });

  it('should ...', inject([PhonePickerService], (service: PhonePickerService) => {
    expect(service).toBeTruthy();
  }));
});