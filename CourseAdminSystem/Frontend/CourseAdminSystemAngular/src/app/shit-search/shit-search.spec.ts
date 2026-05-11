import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShitSearch } from './shit-search';
import { provideRouter } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Toilet } from '../model/toilet';
import { ToiletList } from '../toilet-list/toilet-list';

describe('ShitSearch', () => {
  let component: ShitSearch;
  let fixture: ComponentFixture<ShitSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShitSearch],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShitSearch);
    component = fixture.componentInstance;
    component.Toilets = [{
      ToiletId: 1,
      Location: 1,
      }] as Toilet[];
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
