import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLogIn } from './page-log-in';

describe('PageLogIn', () => {
  let component: PageLogIn;
  let fixture: ComponentFixture<PageLogIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLogIn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageLogIn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
