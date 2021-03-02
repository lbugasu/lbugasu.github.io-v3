import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevPostPageComponent } from './dev-post-page.component';

describe('DevPostPageComponent', () => {
  let component: DevPostPageComponent;
  let fixture: ComponentFixture<DevPostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevPostPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
