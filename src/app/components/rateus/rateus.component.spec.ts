import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateusComponent } from './rateus.component';

describe('RateusComponent', () => {
  let component: RateusComponent;
  let fixture: ComponentFixture<RateusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RateusComponent]
    });
    fixture = TestBed.createComponent(RateusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
