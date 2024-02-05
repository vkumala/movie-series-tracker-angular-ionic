import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButton,IonContent, IonSearchbar, IonSegmentButton, IonLabel, IonSegment } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { LocalStorageService } from '../services/local-storage.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader,
    FormsModule, IonToolbar, IonButton, IonSegment, IonLabel, IonSearchbar, IonSegmentButton, IonTitle, IonContent, ExploreContainerComponent]
})
export class Tab2Page {
  segmentValue
  constructor(
    private storage: LocalStorageService,
  ) { }

  ngOnInit() {
    this.segmentValue = 'tv-shows';
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
  }

  click(){
    console.log("this.segmentValue",this.segmentValue)
  }
}
