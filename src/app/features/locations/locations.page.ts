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
 import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { CardComponent } from "src/app/shared/components/card/card.component";
  import { ApiResponse } from "src/app/core/models/api-response.model";
  import { LocationService } from "src/app/core/services/location-service";
import { Location } from "src/app/core/models/location.model";
@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
  standalone: true,
imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    FormsModule, 
    HeaderComponent, 
    CardComponent,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class LocationsPage implements OnInit {
  locations: Location[] = [];
  responseApi: ApiResponse<Location>= { info: { count: 0, pages: 0, next: "", prev: "" }, results: [] };
  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.getLocations().subscribe((data) => {
      this.locations = data.results;
      this.responseApi = data;
      console.log('Locations:', this.locations);
      console.log('API Response:', this.responseApi);
    });
  }

}
