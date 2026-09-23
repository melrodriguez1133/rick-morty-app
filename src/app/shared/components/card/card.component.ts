import { Component, Input, OnInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { StatusTextPipe } from '../../pipes/status-text-pipe';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,

} from '@ionic/angular';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    UpperCasePipe,
    StatusTextPipe,
    CommonModule
  ],
})
export class CardComponent implements OnInit {

  @Input() title: string = '';
  @Input() image?: string = '';
  @Input() subtitle: string = '';
  @Input() description: string = '';

  constructor() {}

  ngOnInit() {}


}