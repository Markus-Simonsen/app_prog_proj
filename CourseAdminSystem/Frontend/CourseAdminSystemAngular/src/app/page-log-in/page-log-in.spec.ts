import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageLogIn } from './page-log-in';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { User } from '../model/user';

describe('PageLogIn', () => {
  let component: PageLogIn;
  let fixture: ComponentFixture<PageLogIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLogIn],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PageLogIn);
    component = fixture.componentInstance;
    component.users = [
      {
        Userid: 1,
        FirstName: 'test',
        LastName: 'user',
        Email: 'test@example.com',
        Password: 'password1',
      } as User,
    ];
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
