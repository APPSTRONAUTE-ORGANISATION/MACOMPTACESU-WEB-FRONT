import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPwdComponent } from './reset-pwd.component';

describe('ResetPwdComponent', () => {
  let component: ResetPwdComponent;
  let fixture: ComponentFixture<ResetPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPwdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
