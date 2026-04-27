import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUserInput } from './page-user-input';

describe('PageUserInput', () => {
  let component: PageUserInput;
  let fixture: ComponentFixture<PageUserInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageUserInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageUserInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
