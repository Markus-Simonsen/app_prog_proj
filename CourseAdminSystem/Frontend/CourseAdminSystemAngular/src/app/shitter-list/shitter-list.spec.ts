import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShitterList } from './shitter-list';

describe('ShitterList', () => {
  let component: ShitterList;
  let fixture: ComponentFixture<ShitterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShitterList],
    }).compileComponents();

    fixture = TestBed.createComponent(ShitterList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
