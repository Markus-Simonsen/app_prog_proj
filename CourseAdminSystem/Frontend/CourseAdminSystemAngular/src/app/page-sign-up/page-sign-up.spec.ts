import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSignUp } from './page-sign-up';

describe('PageSignUp', () => {
  let component: PageSignUp;
  let fixture: ComponentFixture<PageSignUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSignUp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSignUp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
