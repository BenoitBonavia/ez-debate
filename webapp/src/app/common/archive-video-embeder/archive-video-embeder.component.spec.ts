import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveVideoEmbederComponent } from './archive-video-embeder.component';

describe('ArchiveVideoEmbederComponent', () => {
  let component: ArchiveVideoEmbederComponent;
  let fixture: ComponentFixture<ArchiveVideoEmbederComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveVideoEmbederComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveVideoEmbederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
