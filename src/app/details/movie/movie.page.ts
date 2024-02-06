import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionSheetController, IonicModule, IonModal } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { OverlayEventDetail } from '@ionic/core/components';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TvShowsService } from 'src/app/services/tv-shows.service';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, YouTubePlayerModule]
})
export class MoviePage {

  id;
  type;
  data;
  videoWidth: any;
  videoHeight: any;
  rating;
  imageUrl;
  title;
  @ViewChild(IonModal) modal;
  trailerKey: string;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name;isModalOpen=false;
note;

  constructor(
    private route: ActivatedRoute,
    private movies: MoviesService,
    private tv: TvShowsService,
    private storage: LocalStorageService,
  ) { }

  async ngOnInit() {
    this.rating=0;
    this.videoWidth = window.innerWidth;
    this.videoHeight = 9 * window.innerWidth / 16;
    this.id = this.route.snapshot.paramMap.get("id");
    this.type = this.route.snapshot.paramMap.get("type");
    console.log(this.type, "!!!!")
    if (this.type === 'movie') {
      this.movies.getDetails(this.id).subscribe(async (res: any) => {
        this.data = res;
        this.imageUrl = 'https://image.tmdb.org/t/p/w200' + res.poster_path;
        this.title = res.title
      });
      this.movies.getTrailerYoutubeId(this.id).subscribe(async (res: any) => {
        console.log(res['results'])
        this.trailerKey = res['results'].find(o => o.site === 'YouTube' && o.type === 'Trailer' && o.official === true)?.key;
      });
    }
    else {
      this.tv.getDetails(this.id).subscribe(async (res: any) => {
        this.data = res;
        this.imageUrl = 'https://image.tmdb.org/t/p/w200' + res.poster_path;
        this.title = res.name
      });
      this.tv.getTrailerYoutubeId(this.id).subscribe(async (res: any) => {
        console.log(res['results'])
        this.trailerKey = res['results'].find(o => o.site === 'YouTube' && o.type === 'Trailer')?.key;
        //TODO: check if no videos!
      });
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  saveRating(){
    this.storage.addRating(this.type, this.id, this.rating, this.note)
    this.setOpen(false)
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  rate(star: number) {
    console.log("star", star)
    if (this.rating === star) {
      this.rating = 0
    } else {
      this.rating = star
    }
  }


  addTo(listType: string) {
    if (listType === 'watchlist') {
      this.storage.addToWatchlist(this.type, this.id)
    } else if (listType === 'watching') {
      this.storage.addToWatching(this.type, this.id)
    } else if (listType === 'watched') {
      this.storage.addToWatched(this.type, this.id)
    } else {
      this.storage.addToAbandoned(this.type, this.id)
    }
  }
  /*   getBackground() {
      return 'background-image: url("https://image.tmdb.org/t/p/w1280' + this.data.backdrop_path + '");   background-size: cover;    opacity: 0.5;'
    } */
}
