import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WatchingPage } from './watching.page';

describe('WatchingPage', () => {
  let component: WatchingPage;
  let fixture: ComponentFixture<WatchingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WatchingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
