import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubContributionComponent } from './github-contribution.component';

describe('GithubContributionComponent', () => {
  let component: GithubContributionComponent;
  let fixture: ComponentFixture<GithubContributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubContributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
