import { Component } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';

import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MenuComponent } from '../../../shared/components/menu/menu.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [
    IonRouterOutlet,
    HeaderComponent,
    MenuComponent
  ]
})
export class MainLayoutComponent {

}