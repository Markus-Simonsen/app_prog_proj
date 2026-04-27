import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageReview } from './page-review';

describe('PageReview', () => {
  let component: PageReview;
  let fixture: ComponentFixture<PageReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageReview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
