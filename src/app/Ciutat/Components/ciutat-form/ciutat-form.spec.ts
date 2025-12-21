import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiutatForm } from './ciutat-form';

describe('CiutatForm', () => {
  let component: CiutatForm;
  let fixture: ComponentFixture<CiutatForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiutatForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CiutatForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
