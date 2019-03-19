import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotBuilderComponent } from './pivot-builder.component';

describe('PivotBuilderComponent', () => {
  let component: PivotBuilderComponent;
  let fixture: ComponentFixture<PivotBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PivotBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
