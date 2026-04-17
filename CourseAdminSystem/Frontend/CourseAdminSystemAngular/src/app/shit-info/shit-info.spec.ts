import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShitInfo } from './shit-info';

describe('ShitInfo', () => {
  let component: ShitInfo;
  let fixture: ComponentFixture<ShitInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShitInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShitInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
