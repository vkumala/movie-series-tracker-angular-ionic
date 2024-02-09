import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MoviesService } from 'src/app/services/movies.service';
import { TvShowsService } from 'src/app/services/tv-shows.service';

@Component({
  selector: 'app-casts',
  templateUrl: './casts.component.html',
  styleUrls: ['./casts.component.scss'],
  standalone: true,
  imports: [RouterLink, IonicModule, CommonModule, FormsModule,]
})
export class CastsComponent implements OnInit {

  @Input() id: number;
  @Input() type: string;
casts:Array<any>;
  constructor(private movies: MoviesService,
    private tv: TvShowsService,) { }

  ngOnInit() {
    console.log("!!",this.id, this.type)
    if (this.type === 'movie') {
      this.movies.getCredits(this.id).subscribe(async (res: any) => {
        console.log(res.cast)
        this.casts = res.cast
      });
    }else{
      this.tv.getCredits(this.id).subscribe(async (res: any) => {

        this.casts = res.cast
      });
    }
  }



}
