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
import Utils from '../../utils'
import { CastsComponent } from '../casts/casts.component';
import { RecommendationComponent } from '../recommendation/recommendation.component';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, YouTubePlayerModule, CastsComponent, RecommendationComponent]
})
export class MoviePage {

  id;
  type;
  data;
  mydata;
  videoWidth: any;
  videoHeight: any;
  rating;
  imageUrl;
  title;
  @ViewChild(IonModal) modal;
  trailerKey: string;
  name; isModalOpen = false;
  note;

  constructor(
    private route: ActivatedRoute,
    private movies: MoviesService,
    private tv: TvShowsService,
    private storage: LocalStorageService,
  ) { }

  ngOnInit() {
    this.videoWidth = window.innerWidth < 640 ? window.innerWidth : 640;
    this.videoHeight = 9 * this.videoWidth / 16;
    this.id = this.route.snapshot.paramMap.get("id");
    this.type = this.route.snapshot.paramMap.get("type");
    console.log(this.type, "!!!!")
    this.mydata = this.storage.getItem(this.type, this.id)
    this.rating = this.mydata?.rating ? this.mydata?.rating : undefined;
    if (this.type === 'movie') {
      this.movies.getDetails(this.id).subscribe(async (res: any) => {
        this.data = res;
        console.log(res)
        this.imageUrl = Utils.getImageLink(200, res.poster_path);
        this.title = res.title
      });
      this.movies.getTrailerYoutubeId(this.id).subscribe(async (res: any) => {
        this.trailerKey = res['results'].find(o => o.site === 'YouTube' && o.type === 'Trailer' && o.official === true)?.key;
      });
    }
    else {
      this.tv.getDetails(this.id).subscribe(async (res: any) => {
        this.data = res;
        this.imageUrl = Utils.getImageLink(200, res.poster_path);
        this.title = res.name
      });
      this.tv.getTrailerYoutubeId(this.id).subscribe(async (res: any) => {
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

  saveRating() {
    this.storage.addRating(this.type, this.id, this.rating, this.note)
    this.setOpen(false)
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;

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
      this.setOpen(true)
      this.storage.addToWatched(this.type, this.id)
    } else {
      this.storage.addToAbandoned(this.type, this.id)
    }
    console.log(this.mydata)
  }

  getBackground() {
    return 'background-image: url("https://image.tmdb.org/t/p/w1280' + this.data?.backdrop_path + '");        background: rgba(255,255, 255, 0.5);   background-position-x: center;   ';
  }
}
