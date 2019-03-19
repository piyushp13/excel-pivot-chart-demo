import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableContComponent } from './table-cont.component';

describe('TableContComponent', () => {
  let component: TableContComponent;
  let fixture: ComponentFixture<TableContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
