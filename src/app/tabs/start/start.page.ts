import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MoviesService } from 'src/app/services/movies.service';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { PosterCardComponent } from 'src/app/components/poster-card/poster-card.component';
import { IonContent, InfiniteScrollCustomEvent } from '@ionic/angular/standalone';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule, PosterCardComponent
  ]
})
export class StartPage implements OnInit {


  public hasScrollbar: Boolean = false;

  @ViewChild(IonContent, { static: false }) private content: IonContent;
  isMovie: boolean;
  segment = 'movie';

  page = 1
  discoveryList;
  constructor(
    private router: Router,
    private movies: MoviesService,
    private shows: TvShowsService,
  ) { }

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.isMovie = true;

    this.movies.discover(this.page).subscribe((res: any) => {
      this.discoveryList = res.results;
    });

  }

  loadTvShows() {
    this.isMovie = false;
    this.shows.discover(this.page).subscribe((res: any) => {
      this.discoveryList = res.results;
    });
  }


  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
    this.page = 1;
    if (this.segment == 'movie') {
      this.loadMovies()
    } else {
      this.loadTvShows()
    }
  }

  onIonInfinite(ev) {
    this.page = this.page + 1
    if (this.segment == 'movie') {
      console.log("loadmore movie")
        this.movies.discover(this.page).subscribe((res: any) => {
          this.discoveryList = this.discoveryList.concat(res.results);
        });
      } else {
        console.log("loadmore show")
        this.shows.discover(this.page).subscribe((res: any) => {
          this.discoveryList = this.discoveryList.concat(res.results);
        });
      }
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  search(ev) {
    this.router.navigate(
      ['/search'],
      { queryParams: { query: ev } }
    );
  }


}
