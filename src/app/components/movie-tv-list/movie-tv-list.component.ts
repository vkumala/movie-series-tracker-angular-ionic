import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule, ItemReorderEventDetail } from '@ionic/angular';
import { PosterCardComponent } from '../poster-card/poster-card.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-movie-tv-list',
  templateUrl: './movie-tv-list.component.html',
  styleUrls: ['./movie-tv-list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, PosterCardComponent, RouterLink]
})
export class MovieTvListComponent  implements OnInit {

  @Input() list: any[];
  @Input() isMovie: boolean;

  constructor(
    private storage: LocalStorageService,) { }

  ngOnInit() {}

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {

    console.log('Before complete', this.list);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. Update the items variable to the
    // new order of items
    this.list = ev.detail.complete(this.list);

    // After complete is called the items will be in the new order
    console.log('After complete', this.list);
  }

  trackItems(index: number, itemNumber: number) {
    return itemNumber;
  }
}
