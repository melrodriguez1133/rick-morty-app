import {
  Component,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon
} from '@ionic/angular';

import {
  chevronBackOutline,
  chevronForwardOutline
} from 'ionicons/icons';

import { addIcons } from 'ionicons';

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

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    CardComponent,
    LoadingComponent
  ]
})
export class LocationPage {


  // ==========================================
  // LOCATIONS
  // ==========================================

  locations: LocationModel[] = [];


  // ==========================================
  // FILTROS
  // ==========================================

  filters: LocationFilters = {};


  // ==========================================
  // LOADING
  // ==========================================

  loading = false;


  // ==========================================
  // PAGINACIÓN
  // ==========================================

  currentPage = 1;

  totalPages = 1;

  totalLocations = 0;


  constructor(
    private locationService: LocationService,
    private cdr: ChangeDetectorRef
  ) {

    addIcons({
      chevronBackOutline,
      chevronForwardOutline
    });

  }


  // ==========================================
  // ENTRAR A LA VISTA
  // ==========================================

  ionViewWillEnter(): void {

    this.loadLocations(1);

  }


  // ==========================================
  // BUSCAR LOCATION
  // ==========================================

  searchLocations(): void {

    if (this.filters.name) {

      this.filters.name =
        this.filters.name.trim();

    }

    this.loadLocations(1);

  }


  // ==========================================
  // CAMBIO DE FILTRO
  // ==========================================

  onFilterChange(): void {

    /*
     * Cada vez que cambia
     * type o dimension,
     * volvemos a la primera página.
     */

    this.loadLocations(1);

  }


  // ==========================================
  // CARGAR LOCATIONS
  // ==========================================

  loadLocations(
    page: number = 1
  ): void {

    this.loading = true;


    this.locationService
      .getFilteredLocations(
        this.filters,
        page
      )
      .subscribe({

        next: (
          response: ApiResponse<LocationModel>
        ) => {

          // ==============================
          // RESULTADOS
          // ==============================

          this.locations =
            response.results;


          // ==============================
          // TOTAL
          // ==============================

          this.totalLocations =
            response.info.count;


          // ==============================
          // PÁGINAS
          // ==============================

          this.totalPages =
            response.info.pages;


          this.currentPage =
            page;


          // ==============================
          // LOADING
          // ==============================

          this.loading = false;


          this.cdr.detectChanges();

        },


        error: (error) => {

          console.error(
            '❌ Error cargando locations:',
            error
          );


          this.locations = [];

          this.totalLocations = 0;

          this.totalPages = 1;

          this.loading = false;


          this.cdr.detectChanges();

        }

      });

  }


  // ==========================================
  // PRIMERA PÁGINA
  // ==========================================

  firstPage(): void {

    if (
      this.currentPage !== 1
    ) {

      this.loadLocations(1);

    }

  }


  // ==========================================
  // PÁGINA ANTERIOR
  // ==========================================

  previousPage(): void {

    if (
      this.currentPage > 1
    ) {

      this.loadLocations(
        this.currentPage - 1
      );

    }

  }


  // ==========================================
  // PÁGINA SIGUIENTE
  // ==========================================

  nextPage(): void {

    if (
      this.currentPage <
      this.totalPages
    ) {

      this.loadLocations(
        this.currentPage + 1
      );

    }

  }


  // ==========================================
  // ÚLTIMA PÁGINA
  // ==========================================

  lastPage(): void {

    if (
      this.currentPage !==
      this.totalPages
    ) {

      this.loadLocations(
        this.totalPages
      );

    }

  }


  // ==========================================
  // IR A PÁGINA
  // ==========================================

  goToPage(
    page: number | string
  ): void {

    if (
      typeof page !== 'number'
    ) {

      return;

    }


    if (
      page < 1 ||
      page > this.totalPages ||
      page === this.currentPage
    ) {

      return;

    }


    this.loadLocations(page);

  }


  // ==========================================
  // PÁGINAS DESKTOP
  // ==========================================

  get visiblePages(): (number | string)[] {

    const pages:
      (number | string)[] = [];


    // ----------------------------------------
    // TODAS LAS PÁGINAS
    // ----------------------------------------

    if (
      this.totalPages <= 7
    ) {

      for (
        let i = 1;
        i <= this.totalPages;
        i++
      ) {

        pages.push(i);

      }

      return pages;

    }


    // ----------------------------------------
    // CERCA DEL INICIO
    // ----------------------------------------

    if (
      this.currentPage <= 4
    ) {

      pages.push(1);
      pages.push(2);
      pages.push(3);
      pages.push(4);
      pages.push('...');
      pages.push(this.totalPages);

      return pages;

    }


    // ----------------------------------------
    // CERCA DEL FINAL
    // ----------------------------------------

    if (
      this.currentPage >=
      this.totalPages - 3
    ) {

      pages.push(1);
      pages.push('...');

      pages.push(
        this.totalPages - 3
      );

      pages.push(
        this.totalPages - 2
      );

      pages.push(
        this.totalPages - 1
      );

      pages.push(
        this.totalPages
      );

      return pages;

    }


    // ----------------------------------------
    // EN MEDIO
    // ----------------------------------------

    pages.push(1);

    pages.push('...');

    pages.push(
      this.currentPage - 1
    );

    pages.push(
      this.currentPage
    );

    pages.push(
      this.currentPage + 1
    );

    pages.push('...');

    pages.push(
      this.totalPages
    );


    return pages;

  }


  // ==========================================
  // PÁGINAS MÓVIL
  // ==========================================

  get mobilePages(): (number | string)[] {

    const pages:
      (number | string)[] = [];


    // ----------------------------------------
    // POCAS PÁGINAS
    // ----------------------------------------

    if (
      this.totalPages <= 5
    ) {

      for (
        let i = 1;
        i <= this.totalPages;
        i++
      ) {

        pages.push(i);

      }

      return pages;

    }


    // ----------------------------------------
    // CERCA DEL INICIO
    // ----------------------------------------

    if (
      this.currentPage <= 2
    ) {

      pages.push(1);
      pages.push(2);
      pages.push(3);
      pages.push('...');
      pages.push(this.totalPages);

      return pages;

    }


    // ----------------------------------------
    // CERCA DEL FINAL
    // ----------------------------------------

    if (
      this.currentPage >=
      this.totalPages - 1
    ) {

      pages.push(1);
      pages.push('...');

      pages.push(
        this.totalPages - 2
      );

      pages.push(
        this.totalPages - 1
      );

      pages.push(
        this.totalPages
      );

      return pages;

    }


    // ----------------------------------------
    // EN MEDIO
    // ----------------------------------------

    pages.push(
      this.currentPage - 1
    );

    pages.push(
      this.currentPage
    );

    pages.push(
      this.currentPage + 1
    );

    pages.push('...');

    pages.push(
      this.totalPages
    );


    return pages;

  }


  // ==========================================
  // PUEDE IR ATRÁS
  // ==========================================

  get canGoPrevious(): boolean {

    return (
      this.currentPage > 1
    );

  }


  // ==========================================
  // PUEDE IR ADELANTE
  // ==========================================

  get canGoNext(): boolean {

    return (
      this.currentPage <
      this.totalPages
    );

  }

}