import { Component, OnInit } from '@angular/core';
import { 
  IonHeader, 
  IonContent, 
  IonButton, 
  IonButtons,
  IonToolbar,
  IonTitle,
  IonIcon
} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
     IonHeader, 
  IonContent, 
  IonButton, 
  IonButtons,
  IonToolbar,
  IonTitle,
  IonIcon
  ],
})
export class HeaderComponent  implements OnInit {

  constructor() {
     addIcons({ heartOutline  });
   }

  ngOnInit() {}

}
