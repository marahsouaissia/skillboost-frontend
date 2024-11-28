import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdeailsprofileComponent } from './testdeailsprofile.component';

describe('TestdeailsprofileComponent', () => {
  let component: TestdeailsprofileComponent;
  let fixture: ComponentFixture<TestdeailsprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestdeailsprofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestdeailsprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
