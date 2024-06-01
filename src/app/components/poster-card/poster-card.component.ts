import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton,IonCardContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from 'src/app/explore-container/explore-container.component';

@Component({
  selector: 'app-poster-card',
  templateUrl: './poster-card.component.html',
  styleUrls: ['./poster-card.component.scss'],
  standalone: true,
  imports: [
    RouterLink,IonHeader,IonFooter, IonCardContent, IonButton, PosterCardComponent, IonToolbar, IonChip, IonGrid, IonCol, IonRow ,IonCardHeader, IonCardTitle, IonCardSubtitle, IonTitle,IonIcon, IonContent, ExploreContainerComponent, IonCard, CommonModule],

})
export class PosterCardComponent   {
  
  @Input() data: any;
  @Input() isMovie: boolean;

  imgUrl;



}
