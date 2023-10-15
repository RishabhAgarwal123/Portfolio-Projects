import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewListItemComponent } from './new-list-item.component';

describe('NewListItemComponent', () => {
  let component: NewListItemComponent;
  let fixture: ComponentFixture<NewListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
