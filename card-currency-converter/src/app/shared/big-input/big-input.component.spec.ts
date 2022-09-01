import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigInputComponent } from './big-input.component';

describe('BigInputComponent', () => {
  let component: BigInputComponent;
  let fixture: ComponentFixture<BigInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
