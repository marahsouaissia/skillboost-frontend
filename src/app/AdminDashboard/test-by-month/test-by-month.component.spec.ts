import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestByMonthComponent } from './test-by-month.component';

describe('TestByMonthComponent', () => {
  let component: TestByMonthComponent;
  let fixture: ComponentFixture<TestByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestByMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
