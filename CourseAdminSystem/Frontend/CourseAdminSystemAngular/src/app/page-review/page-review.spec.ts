import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AShit } from '../model/ashit';

import { PageReview } from './page-review';

describe('PageReview', () => {
  let component: PageReview;
  let fixture: ComponentFixture<PageReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageReview],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageReview);
    component = fixture.componentInstance;
    component.newAShit = {
        ShitID: 0,
        Shitterid: 1,
        Toiletid: 1,
        Time: new Date(),
        Rating: 3,
        Review: 'Test review',
      } as AShit;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
