import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AShit } from '../model/ashit';

import { ShitInfo } from './shit-info';

describe('ShitInfo', () => {
  let component: ShitInfo;
  let fixture: ComponentFixture<ShitInfo>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShitInfo],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShitInfo);
    component = fixture.componentInstance;
    component.toiletid = 1;
      fixture.detectChanges(); // triggers ngOnInit
      httpMock = TestBed.inject(HttpTestingController);
      const req = httpMock.expectOne('http://localhost:5163/api/ashit?toiletId=1&jointables=true');
      req.flush([{ 
        ShitID: 1, 
        Shitterid: 1, 
        Toiletid: 1, 
        Time: new Date(), 
        Rating: 3, 
        Review: 'Test review',
        TheShitter: { Shitterid: 1, FirstName: 'Test', LastName: 'Shitter', Email: '', Password: '' },
        TheToilet: { ToiletId: 1, Location: 55561256 }
      }] as AShit[]);
      await fixture.whenStable();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
