import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserPasswordComponent } from './edit-user-password.component';

describe('EditUserPasswordComponent', () => {
  let component: EditUserPasswordComponent;
  let fixture: ComponentFixture<EditUserPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
