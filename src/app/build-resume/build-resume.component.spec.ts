import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildResumeComponent } from './build-resume.component';

describe('BuildResumeComponent', () => {
  let component: BuildResumeComponent;
  let fixture: ComponentFixture<BuildResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
