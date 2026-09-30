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
  // LOADING
  // ==========================================

  loading = false;


  // ==========================================
  // PÁGINA ACTUAL
  // ==========================================

  currentPage = 1;


  // ==========================================
  // TOTAL DE PÁGINAS
  // ==========================================

  totalPages = 1;


  // ==========================================
  // TOTAL DE EPISODIOS
  // ==========================================

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

    console.log(
      '🟢 Entrando a Episodes'
    );

    this.loadEpisodes();

  }


  // ==========================================
  // CARGAR EPISODIOS
  // ==========================================

  loadEpisodes(
    page: number = 1
  ): void {

    console.log(
      '🔵 Cargando página:',
      page
    );


    // ========================================
    // LOADING
    // ========================================

    this.loading = true;


    // ========================================
    // GUARDAR PÁGINA
    // ========================================

    this.currentPage = page;


    // ========================================
    // PETICIÓN
    // ========================================

    this.episodeService
      .getFilteredEpisodes(
        this.filters,
        page
      )
      .subscribe({

        next: (
          response: ApiResponse<EpisodeModel>
        ) => {

          console.log(
            '📦 Response:',
            response
          );


          // ==================================
          // GUARDAR EPISODIOS
          // ==================================

          this.episodes =
            response.results;


          // ==================================
          // INFORMACIÓN DE PAGINACIÓN
          // ==================================

          this.totalEpisodes =
            response.info.count;


          this.totalPages =
            response.info.pages;


          // ==================================
          // LOADING
          // ==================================

          this.loading = false;


          // ==================================
          // DETECTAR CAMBIOS
          // ==================================

          this.cdr.detectChanges();


          console.log(
            '🎬 Episodios:',
            this.episodes.length
          );

          console.log(
            '📄 Página:',
            this.currentPage
          );

          console.log(
            '📚 Total páginas:',
            this.totalPages
          );

        },


        error: (error) => {

          console.error(
            '❌ Error cargando episodes:',
            error
          );


          this.episodes = [];

          this.loading = false;

          this.cdr.detectChanges();

        }

      });

  }


  // ==========================================
  // PÁGINA ANTERIOR
  // ==========================================

  previousPage(): void {

    if (this.currentPage <= 1) {

      return;

    }


    const previous =
      this.currentPage - 1;


    this.loadEpisodes(
      previous
    );

  }


  // ==========================================
  // PÁGINA SIGUIENTE
  // ==========================================

  nextPage(): void {

    if (
      this.currentPage >=
      this.totalPages
    ) {

      return;

    }


    const next =
      this.currentPage + 1;


    this.loadEpisodes(
      next
    );

  }


  // ==========================================
  // IR A UNA PÁGINA
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


    this.loadEpisodes(
      page
    );

  }


  // ==========================================
  // ¿PUEDE IR ATRÁS?
  // ==========================================

  get canGoPrevious(): boolean {

    return this.currentPage > 1;

  }


  // ==========================================
  // ¿PUEDE IR ADELANTE?
  // ==========================================

  get canGoNext(): boolean {

    return this.currentPage <
      this.totalPages;

  }

}