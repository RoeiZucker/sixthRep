/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CreateTransactionService } from './CreateTransaction.service';

describe('Service: CreateTransaction', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateTransactionService]
    });
  });

  it('should ...', inject([CreateTransactionService], (service: CreateTransactionService) => {
    expect(service).toBeTruthy();
  }));
});