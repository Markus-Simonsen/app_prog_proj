import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShitMap } from './shit-map';

describe('ShitMap', () => {
  let component: ShitMap;
  let fixture: ComponentFixture<ShitMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShitMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShitMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
