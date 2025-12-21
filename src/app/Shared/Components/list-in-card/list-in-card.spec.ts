import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInCard } from './list-in-card';

describe('ListInCard', () => {
  let component: ListInCard;
  let fixture: ComponentFixture<ListInCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListInCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListInCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
