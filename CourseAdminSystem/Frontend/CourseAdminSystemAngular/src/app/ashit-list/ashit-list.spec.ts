import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AshitList } from './ashit-list';

describe('AshitList', () => {
  let component: AshitList;
  let fixture: ComponentFixture<AshitList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AshitList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AshitList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
