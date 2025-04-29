import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AideModalComponent } from './aide-modal.component';

describe('AideModalComponent', () => {
  let component: AideModalComponent;
  let fixture: ComponentFixture<AideModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AideModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AideModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
