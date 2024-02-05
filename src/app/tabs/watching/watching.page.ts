import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-watching',
  templateUrl: './watching.page.html',
  styleUrls: ['./watching.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class WatchingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
