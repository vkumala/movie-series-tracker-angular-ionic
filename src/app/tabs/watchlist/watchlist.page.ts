import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MoviesService } from 'src/app/services/movies.service';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { PosterCardComponent } from 'src/app/components/poster-card/poster-card.component';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, PosterCardComponent]
})
export class WatchlistPage implements OnInit {

  list;
  segment = 'movie';
  isMovie = true;

  constructor(
    route: ActivatedRoute,
    private storage: LocalStorageService,
    private movies: MoviesService,
    private tvshows: TvShowsService,
  ) {
    route.params.subscribe(val => {
      if (this.segment == 'movie') {
        this.loadMovies()
      } else {
        this.loadTvShows()
      }
    });
  }

  ngOnInit() {
    this.loadMovies();
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
    if (this.segment == 'movie') {
      this.loadMovies()
    } else {
      this.loadTvShows()
    }
  }

  loadMovies() {
    this.list = []
    this.isMovie = true;
    this.movies.getMultipleDetails(this.storage.getWatchlist('movie')).subscribe(
      result => {
        this.list = result;
      }
    )
  }

  loadTvShows() {
    this.list = []
    this.isMovie = false;
    this.tvshows.getMultipleDetails(this.storage.getWatchlist('tv-show')).subscribe(
      result => {
        this.list = result;
      }
    )
  }
}
