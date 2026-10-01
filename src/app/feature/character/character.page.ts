import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';

import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from '@ionic/angular';

import { FormsModule } from '@angular/forms';

import { InfiniteScrollCustomEvent } from '@ionic/angular';

import { Router } from '@angular/router';

import { CharacterService } from '../../core/services/character-service';
import { CharacterModel } from '../../core/models/character.model';
import { CharacterFilters } from '../../core/interface/character-filter.interface';

import { CardComponent } from '../../shared/components/card/card.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';


@Component({
  selector: 'app-character',

  templateUrl: './character.page.html',

  standalone: true,

  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    CardComponent,
    LoadingComponent,
    FormsModule
  ]
})
export class CharacterPage implements OnInit {


  // ==========================================
  // REFERENCIA AL INFINITE SCROLL
  // ==========================================

  @ViewChild(IonInfiniteScroll)
  infiniteScroll!: IonInfiniteScroll;


  // ==========================================
  // PERSONAJES
  // ==========================================

  characters: CharacterModel[] = [];


  // ==========================================
  // LOADING INICIAL
  // ==========================================

  loading = false;


  // ==========================================
  // LOADING DE MÁS PERSONAJES
  // ==========================================

  loadingMore = false;


  // ==========================================
  // PÁGINA ACTUAL
  // ==========================================

  currentPage = 1;


  // ==========================================
  // TOTAL DE PÁGINAS
  // ==========================================

  totalPages = 0;


  // ==========================================
  // ¿HAY MÁS PÁGINAS?
  // ==========================================

  hasMore = true;


  // ==========================================
  // CONTROL DE ERROR 429
  // ==========================================

  rateLimitBlocked = false;

  // ==========================================
  // FILTROS
  // ==========================================

  filters: CharacterFilters = {
  name: '',
  status: '',
  species: '',
  type: '',
  gender: ''
};

searchTerm = '';
showFilters = false;

  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor(
    private characterService: CharacterService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  // ==========================================
  // INIT
  // ==========================================

  ngOnInit(): void {

    this.loadCharacters();

  }


  // ==========================================
  // CARGAR PRIMERA PÁGINA
  // ==========================================

  loadCharacters(): void {

    console.log('================================');
    console.log('🔵 CARGANDO PERSONAJES');
    console.log('================================');


    this.loading = true;

    this.loadingMore = false;

    this.currentPage = 1;

    this.totalPages = 0;

    this.hasMore = true;

    this.rateLimitBlocked = false;

    this.characters = [];


    // Reactivar Infinite Scroll
    if (this.infiniteScroll) {

      this.infiniteScroll.disabled = false;

    }


    this.characterService.getFilteredCharacters(this.filters, 1)
      .subscribe({

        // ====================================
        // SUCCESS
        // ====================================

        next: (response) => {

          console.log('================================');
          console.log('✅ PRIMERA PÁGINA RECIBIDA');
          console.log('================================');

          console.log(response);


          // ==================================
          // GUARDAR PERSONAJES
          // ==================================

          this.characters = response.results;


          // ==================================
          // GUARDAR TOTAL DE PÁGINAS
          // ==================================

          this.totalPages = response.info.pages;


          // ==================================
          // COMPROBAR SI HAY MÁS
          // ==================================

          this.hasMore =
            this.currentPage < this.totalPages;


          // ==================================
          // FINALIZAR LOADING
          // ==================================

          this.loading = false;


          console.log(
            '👥 Personajes:',
            this.characters.length
          );

          console.log(
            '📄 Página:',
            this.currentPage
          );

          console.log(
            '📄 Total páginas:',
            this.totalPages
          );

          console.log(
            '➡️ Hay más:',
            this.hasMore
          );

          console.log(
            '🔴 Loading:',
            this.loading
          );


          // ==================================
          // ACTUALIZAR VISTA
          // ==================================

          this.cdr.detectChanges();

        },


        // ====================================
        // ERROR
        // ====================================

        error: (error) => {

          console.error(
            '❌ Error al cargar personajes:',
            error
          );


          this.characters = [];

          this.loading = false;

          this.hasMore = false;


          // ==================================
          // ACTUALIZAR VISTA
          // ==================================

          this.cdr.detectChanges();

        }

      });

  }


  // ==========================================
  // INFINITE SCROLL
  // ==========================================

  loadMore(
    event: InfiniteScrollCustomEvent
  ): void {

    console.log('================================');
    console.log('🔄 INFINITE SCROLL');
    console.log('================================');

    console.log(
      '📄 Página actual:',
      this.currentPage
    );

    console.log(
      '📄 Total páginas:',
      this.totalPages
    );

    console.log(
      '➡️ Hay más:',
      this.hasMore
    );

    console.log(
      '🔄 Loading more:',
      this.loadingMore
    );

    console.log(
      '🚫 Rate limit:',
      this.rateLimitBlocked
    );


    // ========================================
    // SI YA ESTÁ CARGANDO
    // ========================================

    if (this.loadingMore) {

      console.log(
        '⚠️ Ya existe una petición en curso'
      );

      event.target.complete();

      return;

    }


    // ========================================
    // SI ESTAMOS BLOQUEADOS POR 429
    // ========================================

    if (this.rateLimitBlocked) {

      console.log(
        '⚠️ API temporalmente bloqueada'
      );

      event.target.complete();

      return;

    }


    // ========================================
    // SI NO HAY MÁS PÁGINAS
    // ========================================

    if (
      !this.hasMore ||
      this.currentPage >= this.totalPages
    ) {

      console.log(
        '🏁 No existen más páginas'
      );


      this.hasMore = false;

      event.target.complete();

      event.target.disabled = true;

      this.cdr.detectChanges();

      return;

    }


    // ========================================
    // ACTIVAR LOCK
    // ========================================

    this.loadingMore = true;


    // ========================================
    // SIGUIENTE PÁGINA
    // ========================================

    const nextPage =
      this.currentPage + 1;


    console.log(
      '📡 Solicitando página:',
      nextPage
    );


    // ========================================
    // PETICIÓN
    // ========================================

    this.characterService
  .getFilteredCharacters(
    this.filters,
    nextPage
  )
      .subscribe({

        // ====================================
        // SUCCESS
        // ====================================

        next: (response) => {

          console.log('================================');
          console.log('✅ RESPUESTA CORRECTA');
          console.log('================================');

          console.log(
            '📄 Página:',
            nextPage
          );

          console.log(
            '👥 Personajes recibidos:',
            response.results.length
          );


          // ==================================
          // AGREGAR PERSONAJES
          // ==================================

          this.characters = [
            ...this.characters,
            ...response.results
          ];


          // ==================================
          // ACTUALIZAR PÁGINA
          // ==================================

          this.currentPage =
            nextPage;


          // ==================================
          // ACTUALIZAR TOTAL
          // ==================================

          this.totalPages =
            response.info.pages;


          // ==================================
          // COMPROBAR SI HAY MÁS
          // ==================================

          this.hasMore =
            this.currentPage < this.totalPages;


          // ==================================
          // QUITAR LOCK
          // ==================================

          this.loadingMore = false;


          // ==================================
          // FINALIZAR INFINITE SCROLL
          // ==================================

          event.target.complete();


          // ==================================
          // DESACTIVAR AL TERMINAR
          // ==================================

          if (!this.hasMore) {

            console.log(
              '🏁 ÚLTIMA PÁGINA'
            );

            event.target.disabled = true;

          }


          // ==================================
          // ACTUALIZAR VISTA
          // ==================================

          this.cdr.detectChanges();


          console.log(
            '👥 Personajes totales:',
            this.characters.length
          );

          console.log(
            '📄 Página actual:',
            this.currentPage
          );

          console.log(
            '➡️ Hay más:',
            this.hasMore
          );

        },


        // ====================================
        // ERROR
        // ====================================

        error: (error) => {

          console.error(
            '================================'
          );

          console.error(
            '❌ ERROR AL CARGAR PÁGINA'
          );

          console.error(
            '📄 Página:',
            nextPage
          );

          console.error(error);


          // ==================================
          // QUITAR LOCK
          // ==================================

          this.loadingMore = false;


          // ==================================
          // FINALIZAR SPINNER
          // ==================================

          event.target.complete();


          // ==================================
          // ERROR 429
          // ==================================

          if (error.status === 429) {

            console.warn(
              '⚠️ API LIMITADA: 429 TOO MANY REQUESTS'
            );


            // ==================================
            // ACTIVAR BLOQUEO TEMPORAL
            // ==================================

            this.rateLimitBlocked = true;


            // ==================================
            // DESACTIVAR TEMPORALMENTE
            // ==================================

            event.target.disabled = true;


            // ==================================
            // ESPERAR 5 SEGUNDOS
            // ==================================

            setTimeout(() => {

              console.log(
                '🔓 Reactivando Infinite Scroll'
              );


              this.rateLimitBlocked = false;


              // =================================
              // SOLO REACTIVAR SI HAY MÁS
              // =================================

              if (this.hasMore) {

                event.target.disabled = false;

              }


              this.cdr.detectChanges();

            }, 5000);

          }


          this.cdr.detectChanges();

        }

      });

  }


  // ==========================================
  // IR AL DETALLE
  // ==========================================

  goToCharacter(id: number): void {

    console.log(
      '➡️ Abriendo personaje:',
      id
    );


    this.router.navigate([
      '/character',
      id
    ]);

  }
  // ==========================================
  // BUSQUEDA
  // ==========================================

  onFilterChange(): void {
  this.searchCharacters();
}

searchCharacters(): void {

  this.loading = true;
  this.loadingMore = false;

  this.currentPage = 1;
  this.totalPages = 0;
  this.hasMore = true;

  this.characters = [];

  if (this.infiniteScroll) {
    this.infiniteScroll.disabled = false;
  }

  this.characterService
    .getFilteredCharacters(this.filters, 1)
    .subscribe({

      next: (response) => {

        this.characters = response.results;

        this.totalPages = response.info.pages;

        this.hasMore =
          this.currentPage < this.totalPages;

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          '❌ Error buscando personajes:',
          error
        );

        this.characters = [];

        this.loading = false;

        this.hasMore = false;

        this.cdr.detectChanges();
      }

    });
}
}