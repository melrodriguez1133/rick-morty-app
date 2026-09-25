import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular';

import { LocationService } from '../../core/services/location-service';
import { LocationModel } from '../../core/models/location.model';
import { LocationFilters } from '../../core/interface/location-filter.interface';
import { ApiResponse } from '../../core/models/api-response.model';

import { CardComponent } from '../../shared/components/card/card.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    CardComponent,
    LoadingComponent
  ]
})
export class LocationPage {

  locations: LocationModel[] = [];

  filters: LocationFilters = {};

  loading = false;

  constructor(
    private locationService: LocationService,
    private cdr: ChangeDetectorRef
  ) {}

  ionViewWillEnter(): void {
    console.log('🟢 Entrando a Locations');

    this.loadLocations();
  }

  loadLocations(): void {

    console.log('🔵 Cargando locations...');

    this.loading = true;

    this.locationService
      .getFilteredLocations(this.filters)
      .subscribe({

        next: (response: ApiResponse<LocationModel>) => {

          console.log('📦 Locations:', response);

          this.locations = response.results;

          console.log(
            '🌎 Total locations:',
            this.locations.length
          );

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            '❌ Error cargando locations:',
            error
          );

          this.locations = [];

          this.loading = false;

          this.cdr.detectChanges();
        }

      });
  }
}