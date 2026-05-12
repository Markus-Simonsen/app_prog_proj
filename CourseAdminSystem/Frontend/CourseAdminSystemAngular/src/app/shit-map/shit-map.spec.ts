import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ShitMap } from './shit-map';

describe('ShitMap', () => {
  let component: ShitMap;
  let fixture: ComponentFixture<ShitMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShitMap],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ location: 55561256, toiletid: 1 }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShitMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
