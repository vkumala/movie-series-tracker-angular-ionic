import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollCustomEvent, IonContent, IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { PosterCardComponent } from '../components/poster-card/poster-card.component';
import { PersonCardComponent } from '../components/person-card/person-card.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, PosterCardComponent, PersonCardComponent]
})
export class SearchPage implements OnInit {

  @ViewChild(IonContent) private content: IonContent;
  
  @HostListener('window:resize', ['$event'])
  query: string;
  results: any[];
  page: number = 1;
  hasScrollbar
  constructor(
    private route: ActivatedRoute,
    private movies: MoviesService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
    });
  }

  ngOnInit() {
    this.movies.search(this.query, this.page).subscribe(
      async result => {
        this.results = result.results;
      }
    )
  }

  onIonInfinite(ev) {
    this.page = this.page + 1
    this.movies.search(this.query, this.page).subscribe((res: any) => {
      this.results = this.results.concat(res.results);
    });
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  ScrollToTop() {
    this.content.scrollToTop(1500);
  }

  loadMore() {
    this.page = this.page + 1
    console.log(this.query)
    this.movies.search(this.query, this.page).subscribe((res: any) => {
      this.results = this.results.concat(res.results);
    });
  }  
  
}
