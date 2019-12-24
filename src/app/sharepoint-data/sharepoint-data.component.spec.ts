import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharepointDataComponent } from './sharepoint-data.component';

describe('SharepointDataComponent', () => {
  let component: SharepointDataComponent;
  let fixture: ComponentFixture<SharepointDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharepointDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharepointDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
