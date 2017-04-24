/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GlobalHttpService } from './GlobalHttp.service';

describe('Service: GlobalHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalHttpService]
    });
  });

  it('should ...', inject([GlobalHttpService], (service: GlobalHttpService) => {
    expect(service).toBeTruthy();
  }));
});