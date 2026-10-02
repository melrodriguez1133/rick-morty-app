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

import { EpisodeService } from '../../core/services/episode-service';

import { EpisodeModel } from '../../core/models/episode.model';

import { EpisodeFilters } from '../../core/interface/episode-filter.interface';

import { ApiResponse } from '../../core/models/api-response.model';

import { CardComponent } from '../../shared/components/card/card.component';

import { LoadingComponent } from '../../shared/components/loading/loading.component';


@Component({
  selector: 'app-episode',

  templateUrl: './episode.page.html',

  styleUrls: ['./episode.page.scss'],

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
export class EpisodePage {


  // ==========================================
  // EPISODIOS
  // ==========================================

  episodes: EpisodeModel[] = [];


  // ==========================================
  // FILTROS
  // ==========================================

  filters: EpisodeFilters = {};


  // ==========================================
  // TEMPORADA SELECCIONADA
  // ==========================================

  selectedSeason = '';


  // ==========================================
  // LOADING
  // ==========================================

  loading = false;


  // ==========================================
  // PAGINACIÓN
  // ==========================================

  currentPage = 1;

  totalPages = 1;

  totalEpisodes = 0;


  constructor(
    private episodeService: EpisodeService,
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

    this.loadEpisodes();

  }


  // ==========================================
  // BUSCAR POR NOMBRE
  // ==========================================

  searchEpisodes(): void {

    if (this.filters.name) {

      this.filters.name =
        this.filters.name.trim();

    }

    this.loadEpisodes(1);

  }


  // ==========================================
  // CAMBIAR TEMPORADA
  // ==========================================

  onSeasonChange(): void {

    /*
     * El select devuelve:
     *
     * ""
     * S01
     * S02
     * S03
     * S04
     */

    this.filters.episode =
      this.selectedSeason;

    /*
     * Cada cambio de filtro
     * vuelve a la primera página.
     */

    this.loadEpisodes(1);

  }


  // ==========================================
  // CARGAR EPISODIOS
  // ==========================================

  loadEpisodes(
    page: number = 1
  ): void {

    this.loading = true;

    this.currentPage = page;


    this.episodeService
      .getFilteredEpisodes(
        this.filters,
        page
      )
      .subscribe({

        next: (
          response: ApiResponse<EpisodeModel>
        ) => {

          this.episodes =
            response.results;

          this.totalEpisodes =
            response.info.count;

          this.totalPages =
            response.info.pages;

          this.loading = false;

          this.cdr.detectChanges();

        },


        error: (error) => {

          console.error(
            '❌ Error cargando episodios:',
            error
          );

          this.episodes = [];

          this.totalEpisodes = 0;

          this.totalPages = 1;

          this.loading = false;

          this.cdr.detectChanges();

        }

      });

  }


  // ==========================================
  // PÁGINA ANTERIOR
  // ==========================================

  previousPage(): void {

    if (!this.canGoPrevious) {
      return;
    }

    this.loadEpisodes(
      this.currentPage - 1
    );

  }


  // ==========================================
  // PÁGINA SIGUIENTE
  // ==========================================

  nextPage(): void {

    if (!this.canGoNext) {
      return;
    }

    this.loadEpisodes(
      this.currentPage + 1
    );

  }


  // ==========================================
  // IR A PÁGINA
  // ==========================================

  goToPage(
    page: number
  ): void {

    if (
      page < 1 ||
      page > this.totalPages
    ) {

      return;

    }

    this.loadEpisodes(page);

  }


  // ==========================================
  // PUEDE IR ATRÁS
  // ==========================================

  get canGoPrevious(): boolean {

    return this.currentPage > 1;

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