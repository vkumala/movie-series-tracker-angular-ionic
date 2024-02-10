import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MoviesService } from 'src/app/services/movies.service';
import { TvShowsService } from 'src/app/services/tv-shows.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss'],
  standalone: true,
  imports: [RouterLink, IonicModule, CommonModule, FormsModule,]
})
export class RecommendationComponent  implements OnInit {

  @Input() id: number;
  @Input() type: string;

  
  recommendations: Array<any>;

  constructor(
    private movies: MoviesService,
    private tv: TvShowsService
  ) { }

  ngOnInit() {
    if (this.type === 'movie') {
      this.movies.getRecomendations(this.id).subscribe(async (res: any) => {
        this.recommendations = res.results
      });
    } else {
      this.tv.getRecomendations(this.id).subscribe(async (res: any) => {
        this.recommendations = res.results
      });
    }
  }

}
