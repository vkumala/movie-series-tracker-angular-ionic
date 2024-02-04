import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonSearchbar,IonSegment, IonSegmentButton } from '@ionic/angular/standalone';

import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle,IonSegment, IonSearchbar,IonLabel, IonSegmentButton, IonContent, ExploreContainerComponent],
})
export class Tab4Page {

  constructor() { }

  ngOnInit() {
  }

}
