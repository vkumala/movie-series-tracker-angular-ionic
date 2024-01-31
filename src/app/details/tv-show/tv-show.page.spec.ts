import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvShowPage } from './tv-show.page';

describe('TvShowPage', () => {
  let component: TvShowPage;
  let fixture: ComponentFixture<TvShowPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TvShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
