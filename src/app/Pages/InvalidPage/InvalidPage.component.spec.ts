/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InvalidPageComponenet } from './InvalidPage.component';

describe('InvalidPageComponenetComponent', () => {
  let component: InvalidPageComponenet;
  let fixture: ComponentFixture<InvalidPageComponenet>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidPageComponenet ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidPageComponenet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});