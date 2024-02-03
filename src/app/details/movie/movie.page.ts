import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionSheetController, IonicModule } from '@ionic/angular';
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

  result;
  constructor(
    private route: ActivatedRoute,
    private movies: MoviesService,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");

    this.movies.getDetails(240).subscribe((res: any) => {
      this.data = res;
      console.log(res)
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Example header',
      subHeader: 'Example subheader',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Share',
          data: {
            action: 'share',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
  }


  getBackground() {
    return 'background-image: url("https://image.tmdb.org/t/p/w1280' + this.data.backdrop_path + '");   background-size: cover;    opacity: 0.5;'
  }
}
