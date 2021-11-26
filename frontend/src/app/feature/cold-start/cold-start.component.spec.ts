import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColdStartComponent } from './cold-start.component';

describe('ColdStartComponent', () => {
  let component: ColdStartComponent;
  let fixture: ComponentFixture<ColdStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColdStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColdStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
