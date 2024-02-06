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

  movieLists = ['Now Playing', 'Popular', 'Top Rated', 'Upcoming']
  tvShowsLists = ['Airing Today', 'On The Air', 'Popular', 'Top Rated']

  firstList: any;
  secondList: any;
  thirdList: any;
  fourthList: any;
isMovie: boolean;
  segment = 'movie';
  lists;
  constructor(
    private movies: MoviesService,
    private shows: TvShowsService,
  ) { }

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.lists = this.movieLists;
    this.isMovie = true;
    this.movies.getNowPlaying(1).subscribe((res: any) => {
      this.firstList = res.results;
    });
    this.movies.getPopular(1).subscribe((res: any) => {
      this.secondList = res.results;
    });
    this.movies.getTopRated(1).subscribe((res: any) => {
      this.thirdList = res.results;
    });
    this.movies.getUpcoming(1).subscribe((res: any) => {
      this.fourthList = res.results;
    });
  }

  loadTvShows() {
    this.lists = this.tvShowsLists;
    this.isMovie = false;
    this.shows.getAiringToday(1).subscribe((res: any) => {
      this.firstList = res.results;
    });
    this.shows.getOnTheAir(1).subscribe((res: any) => {
      this.secondList = res.results;
    });
    this.shows.getPopular(1).subscribe((res: any) => {
      this.thirdList = res.results;
    });
    this.shows.getTopRated(1).subscribe((res: any) => {
      this.fourthList = res.results;
    });
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
    if (this.segment == 'movie'){
      this.loadMovies()
    }else{
      this.loadTvShows()
    }
  }
}
