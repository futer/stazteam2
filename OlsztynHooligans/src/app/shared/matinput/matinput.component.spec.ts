import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatinputComponent } from './matinput.component';

describe('MatinputComponent', () => {
  let component: MatinputComponent;
  let fixture: ComponentFixture<MatinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
