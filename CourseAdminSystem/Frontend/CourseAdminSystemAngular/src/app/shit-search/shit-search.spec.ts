import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShitSearch } from './shit-search';

describe('ShitSearch', () => {
  let component: ShitSearch;
  let fixture: ComponentFixture<ShitSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShitSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShitSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
