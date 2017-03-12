/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BuisnessLogicService } from './BuisnessLogic.service';

describe('Service: BuisnessLogic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuisnessLogicService]
    });
  });

  it('should ...', inject([BuisnessLogicService], (service: BuisnessLogicService) => {
    expect(service).toBeTruthy();
  }));
});