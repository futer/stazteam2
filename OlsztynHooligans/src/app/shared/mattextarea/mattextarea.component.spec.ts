import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MattextareaComponent } from './mattextarea.component';

describe('MattextareaComponent', () => {
  let component: MattextareaComponent;
  let fixture: ComponentFixture<MattextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MattextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MattextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
