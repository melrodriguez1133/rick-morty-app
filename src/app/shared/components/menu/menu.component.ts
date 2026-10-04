import { Component } from '@angular/core';

import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonContent,
  IonItem,
  IonIcon,
  IonLabel,
  MenuController,
  
} from '@ionic/angular';

import { RouterLink } from '@angular/router';

import { addIcons } from 'ionicons';

import {
  homeOutline,
  peopleOutline,
  playCircleOutline,
  planetOutline,
  heartOutline,
  personOutline,
  settingsOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],

  imports: [
    IonMenu,
    IonHeader,
    IonToolbar,
    IonContent,
    IonItem,
    IonIcon,
    IonLabel,
    RouterLink
  ]
})
export class MenuComponent {

  constructor(
    private menuController: MenuController
  ) {

    addIcons({
      homeOutline,
      peopleOutline,
      playCircleOutline,
      planetOutline,
      heartOutline,
      personOutline,
      settingsOutline
    });

  }

  async closeMenu() {
    console.log('🔴 Cerrando menú');

    await this.menuController.close('main-menu');
  }

}