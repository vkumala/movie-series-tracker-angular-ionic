import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonButton, IonTitle, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonCard, IonChip, IonCardHeader, IonCol, IonRow, IonGrid, IonSearchbar, IonSegmentButton, IonSegment, IonLabel } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { MoviesService } from '../services/movies.service';
import { CommonModule } from '@angular/common';
import { PosterCardComponent } from '../components/poster-card/poster-card.component';
import { TvShowsService } from '../services/tv-shows.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonButton, IonSegment, IonLabel, IonSegmentButton,PosterCardComponent, IonSearchbar, IonToolbar, IonChip, IonGrid, IonCol, IonRow, IonCardHeader, IonCardTitle, IonCardSubtitle, IonTitle, IonIcon, IonContent, ExploreContainerComponent, IonCard, CommonModule],
})
export class Tab1Page {


  nowPlayingMovies: any;
  popularMovies: any;
  topRatedMovies: any;
  upcomingMovies: any;

  airingTodayShows: any;
  onAirShows: any;
  popularShows: any;
  topRatedShows: any;
  constructor(
    private movies: MoviesService,
    private shows: TvShowsService,
    private storage: LocalStorageService,

  ) { }

  ngOnInit() {
    this.storage.addData(123, 'xxx')
    this.movies.getNowPlaying(1).subscribe((res: any) => {
      this.nowPlayingMovies = res.results;
    });

    this.movies.getPopular(1).subscribe((res: any) => {
      this.popularMovies = res.results;
    });

    this.movies.getTopRated(1).subscribe((res: any) => {
      this.topRatedMovies = res.results;
    });

    this.movies.getUpcoming(1).subscribe((res: any) => {
      this.upcomingMovies = res.results;
    });

    this.shows.getAiringToday(1).subscribe((res: any) => {
      this.airingTodayShows = res.results;
      console.log(this.airingTodayShows)
    });

    this.shows.getOnTheAir(1).subscribe((res: any) => {
      this.onAirShows = res.results;
    });

    this.shows.getPopular(1).subscribe((res: any) => {
      this.popularShows = res.results;
    });

    this.shows.getTopRated(1).subscribe((res: any) => {
      this.topRatedShows = res.results;
    });
  }

  testFunction() {
    console.log("TEST")
    console.log(      this.storage.getRated())
  }
}
