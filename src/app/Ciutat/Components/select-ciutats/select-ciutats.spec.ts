import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCiutats } from './select-ciutats';

describe('SelectCiutats', () => {
  let component: SelectCiutats;
  let fixture: ComponentFixture<SelectCiutats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCiutats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCiutats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
