import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Visit } from '../model/visit';

import { ShitInfo } from './shit-info';

describe('ShitInfo', () => {
  let component: ShitInfo;
  let fixture: ComponentFixture<ShitInfo>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShitInfo],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ShitInfo);
    component = fixture.componentInstance;
    component.toiletid = 1;
    fixture.detectChanges(); // triggers ngOnInit
    httpMock = TestBed.inject(HttpTestingController);
    const req = httpMock.expectOne('http://localhost:5090/api/visit?toiletId=1&jointables=true');
    req.flush([
      {
        VisitID: 1,
        Userid: 1,
        Toiletid: 1,
        Time: new Date(),
        Rating: 3,
        Review: 'Test review',
        TheUser: { Userid: 1, FirstName: 'Test', LastName: 'User', Email: '', Password: '' },
        TheToilet: { ToiletId: 1, Location: 55561256 },
      },
    ] as Visit[]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
