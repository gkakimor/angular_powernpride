import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTopicComponent } from './view-topic.component';

describe('ViewTopicComponent', () => {
  let component: ViewTopicComponent;
  let fixture: ComponentFixture<ViewTopicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTopicComponent]
    });
    fixture = TestBed.createComponent(ViewTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
