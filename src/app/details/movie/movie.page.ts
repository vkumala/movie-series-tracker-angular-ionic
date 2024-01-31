import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MoviePage implements OnInit {

  id;
  data;

  constructor(
    private route: ActivatedRoute,
    private movies: MoviesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");

    this.movies.getDetails(240).subscribe((res: any) => {
      this.data = res;
      console.log(res)
    });
  }

}
