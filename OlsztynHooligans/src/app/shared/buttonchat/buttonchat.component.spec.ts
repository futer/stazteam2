import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonchatComponent } from './buttonchat.component';

describe('ButtonchatComponent', () => {
  let component: ButtonchatComponent;
  let fixture: ComponentFixture<ButtonchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
