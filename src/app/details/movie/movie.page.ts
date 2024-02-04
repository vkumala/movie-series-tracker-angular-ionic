import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionSheetController, IonicModule, IonModal } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';

import { OverlayEventDetail } from '@ionic/core/components';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MoviePage {

  id;
  data;

  result;
  imageUrl;
  title;
  @ViewChild(IonModal) modal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name;


  constructor(
    private route: ActivatedRoute,
    private movies: MoviesService,
    private actionSheetCtrl: ActionSheetController
  ) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");

    this.movies.getDetails(this.id).subscribe(async (res: any) => {
      this.data = res;
      this.imageUrl = 'https://image.tmdb.org/t/p/w200'+res.poster_path;
      this.title = res.title
      console.log(this.imageUrl)
    });
  } cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  rate(star: number) {
    console.log("star", star)
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


/*   getBackground() {
    return 'background-image: url("https://image.tmdb.org/t/p/w1280' + this.data.backdrop_path + '");   background-size: cover;    opacity: 0.5;'
  } */
}
