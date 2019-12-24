import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SPapiComponent } from './spapi.component';

describe('SPapiComponent', () => {
  let component: SPapiComponent;
  let fixture: ComponentFixture<SPapiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SPapiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SPapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
