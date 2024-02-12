import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ItemReorderEventDetail } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MoviesService } from 'src/app/services/movies.service';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { PosterCardComponent } from 'src/app/components/poster-card/poster-card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieTvListComponent } from 'src/app/components/movie-tv-list/movie-tv-list.component';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, PosterCardComponent, RouterLink, MovieTvListComponent]
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

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // Before complete is called with the items they will remain in the
    // order before the drag
    console.log('Before complete', this.list);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. Update the items variable to the
    // new order of items
    this.list = ev.detail.complete(this.list);

    // After complete is called the items will be in the new order
    console.log('After complete', this.list);
  }

  trackItems(index: number, itemNumber: number) {
    return itemNumber;
  }
}
