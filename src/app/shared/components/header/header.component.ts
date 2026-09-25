import { Component, Input } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  MenuController
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import { menuOutline } from 'ionicons/icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon
  ]
})
export class HeaderComponent {

  @Input() title: string = 'Rick & Morty App';

  constructor(
    private menuController: MenuController
  ) {
    addIcons({
      menuOutline
    });
  }

  async openMenu() {

    console.log('🟢 Botón menú presionado');

    const isOpen = await this.menuController.isOpen('main-menu');

    console.log('📌 ¿Está abierto?', isOpen);

    if (!isOpen) {
      await this.menuController.open('main-menu');
      console.log('🟢 Menú abierto');
    }

  }

}