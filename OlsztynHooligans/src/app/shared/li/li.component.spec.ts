import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiComponent } from './li.component';

describe('LiComponent', () => {
  let component: LiComponent;
  let fixture: ComponentFixture<LiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
