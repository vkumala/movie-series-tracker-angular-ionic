import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss'],  standalone: true,  
  imports: [IonicModule, CommonModule,  FormsModule, 
  ]
})
export class PersonCardComponent   {

  @Input() data: any;

}
