import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiutatsComponent } from './ciutats';

describe('CiutatsComponent', () => {
  let component: CiutatsComponent;
  let fixture: ComponentFixture<CiutatsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiutatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CiutatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
