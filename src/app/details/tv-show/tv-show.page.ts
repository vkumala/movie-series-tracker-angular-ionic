import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.page.html',
  styleUrls: ['./tv-show.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TvShowPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
