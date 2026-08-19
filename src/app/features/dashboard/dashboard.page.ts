import { Component, OnInit } from '@angular/core';
 import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
   IonGrid,
    IonRow,
    IonCol

} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
     FormsModule, 
    HeaderComponent,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class DashboardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
