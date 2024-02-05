import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MoviesService } from 'src/app/services/movies.service';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { PosterCardComponent } from 'src/app/components/poster-card/poster-card.component';
import { IonHeader, IonTitle, IonToolbar, IonContent, IonSegment, IonSegmentButton, IonLabel, IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule, PosterCardComponent
  ]
})
export class StartPage implements OnInit {

  nowPlayingMovies: any;
  popularMovies: any;
  topRatedMovies: any;
  upcomingMovies: any;

  segment = 'movie';
  constructor(
    private movies: MoviesService,
    private shows: TvShowsService,
  ) { }

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
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
  }

  loadTvShows() {
    this.shows.getAiringToday(1).subscribe((res: any) => {
      this.nowPlayingMovies = res.results;
    });
    this.shows.getOnTheAir(1).subscribe((res: any) => {
      this.popularMovies = res.results;
    });
    this.shows.getPopular(1).subscribe((res: any) => {
      this.topRatedMovies = res.results;
    });
    this.shows.getTopRated(1).subscribe((res: any) => {
      this.upcomingMovies = res.results;
    });
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
    if (this.segment == 'movie'){
      this.loadMovies()
    }else{
      this.loadTvShows()
    }
    console.log('Segment changed', ev.detail.value);
  }
}
