import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopThreeTestsComponent } from './top-three-tests.component';

describe('TopThreeTestsComponent', () => {
  let component: TopThreeTestsComponent;
  let fixture: ComponentFixture<TopThreeTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopThreeTestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopThreeTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
