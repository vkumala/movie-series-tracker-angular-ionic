import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { MoviesService } from '../services/movies.service';
import { TvShowsService } from '../services/tv-shows.service';
import { PersonService } from '../services/person.service';
import Utils from '../utils';

@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class PersonPage implements OnInit {
  id;
  credits1;
  credits2;
  imageUrl;
  data;

  constructor(
    private route: ActivatedRoute,
    private movies: MoviesService,
    private tv: TvShowsService,
    private storage: LocalStorageService,
    private personService: PersonService,
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get("id");
    this.personService.getDetails(this.id).subscribe(async (res: any) => {
      this.data = res
      this.imageUrl = Utils.getImageLink(200, res.profile_path);
    });
    this.personService.getMovieCredits(this.id).subscribe(async (res: any) => {
      this.credits1 = res.cast.sort((a, b) => (a.release_date > b.release_date ? -1 : 1));
    });
    this.personService.getTVCredits(this.id).subscribe(async (res: any) => {
      this.credits2 = res.cast.sort((a, b) => (a.first_air_date > b.first_air_date ? -1 : 1));
    });
  }


}
