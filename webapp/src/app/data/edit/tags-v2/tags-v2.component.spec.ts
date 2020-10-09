import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsV2Component } from './tags-v2.component';

describe('TagsV2Component', () => {
  let component: TagsV2Component;
  let fixture: ComponentFixture<TagsV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
