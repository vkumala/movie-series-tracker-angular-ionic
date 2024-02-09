import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MoviesService } from 'src/app/services/movies.service';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { PosterCardComponent } from 'src/app/components/poster-card/poster-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, PosterCardComponent]
})
export class WatchlistPage implements OnInit {
  myList;

  constructor(
    route: ActivatedRoute,
    private storage: LocalStorageService,
    private movies: MoviesService,
    private tvshows: TvShowsService,

  ) {
    route.params.subscribe(async val => {
      console.log("constructor")
      await this.loadData()
    });
  }
  async ngOnInit() {
    console.log("ngOnInit")
    await this.loadData()
  }
  loadData() {
    this.myList = []
    let watchlist = this.storage.getWatchlist();
    watchlist.forEach((item, idx) => {
      if (item.type === 'movie') {
        this.movies.getDetails(item.id).subscribe((res: any) => {
          this.myList.push(res)

        });
      } else {
        this.tvshows.getDetails(item.id).subscribe((res: any) => {
          this.myList.push(res)
        });
      }
    });
    /* for (var item of watchlist) {
      if (item.type === 'movie') {
        this.movies.getDetails(item.id).subscribe((res: any) => {
          this.myList.push(res)

        });
      } else {
        this.tvshows.getDetails(item.id).subscribe((res: any) => {
          this.myList.push(res)
        });
      }
    } */
  }
}
