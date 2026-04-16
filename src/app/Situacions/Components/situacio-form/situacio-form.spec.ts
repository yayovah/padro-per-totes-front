import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacioForm } from './situacio-form';

describe('SituacioForm', () => {
  let component: SituacioForm;
  let fixture: ComponentFixture<SituacioForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SituacioForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SituacioForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
