import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonSegmentButton, IonLabel, IonSegment } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonSegment, IonLabel, IonSearchbar, IonSegmentButton, IonTitle, IonContent, ExploreContainerComponent]
})
export class Tab2Page {

  constructor() { }

  ngOnInit() {
  }
}
