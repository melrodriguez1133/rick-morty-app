import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular';

import { forkJoin, Observable, of } from 'rxjs';

import { LocalStorageService } from '../../core/services/local-storage';

import { CharacterService } from '../../core/services/character-service';
import { EpisodeService } from '../../core/services/episode-service';
import { LocationService } from '../../core/services/location-service';

import { CharacterModel } from '../../core/models/character.model';
import { EpisodeModel } from '../../core/models/episode.model';
import { LocationModel } from '../../core/models/location.model';

import { CardComponent } from '../../shared/components/card/card.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    CardComponent,
    LoadingComponent
  ]
})
export class FavoritePage {

  // =========================================
  // ESTADO
  // =========================================

  loading = false;


  // =========================================
  // FAVORITOS
  // =========================================

  favoriteCharacters: CharacterModel[] = [];

  favoriteEpisodes: EpisodeModel[] = [];

  favoriteLocations: LocationModel[] = [];


  // =========================================
  // CONSTRUCTOR
  // =========================================

  constructor(
    private localStorageService: LocalStorageService,
    private characterService: CharacterService,
    private episodeService: EpisodeService,
    private locationService: LocationService,
    private cdr: ChangeDetectorRef
  ) {}


  // =========================================
  // AL ENTRAR A FAVORITOS
  // =========================================

  ionViewWillEnter(): void {
    this.loadFavorites();
  }


  // =========================================
  // CARGAR TODOS LOS FAVORITOS
  // =========================================

  loadFavorites(): void {

    this.loading = true;

    // Limpiar listas actuales
    this.favoriteCharacters = [];
    this.favoriteEpisodes = [];
    this.favoriteLocations = [];


    // =========================================
    // OBTENER IDS DEL LOCAL STORAGE
    // =========================================

    const characterIds =
      this.localStorageService.getFavoriteCharacters();

    const episodeIds =
      this.localStorageService.getFavoriteEpisodes();

    const locationIds =
      this.localStorageService.getFavoriteLocations();


    // =========================================
    // CARGAR DATOS DESDE LA API
    // =========================================

    forkJoin({

      characters: this.getCharacters(characterIds),

      episodes: this.getEpisodes(episodeIds),

      locations: this.getLocations(locationIds)

    }).subscribe({

      next: (response) => {

        this.favoriteCharacters = response.characters;

        this.favoriteEpisodes = response.episodes;

        this.favoriteLocations = response.locations;

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'Error cargando favoritos:',
          error
        );

        this.favoriteCharacters = [];

        this.favoriteEpisodes = [];

        this.favoriteLocations = [];

        this.loading = false;

        this.cdr.detectChanges();
      }

    });
  }


  // =========================================
  // OBTENER PERSONAJES
  // =========================================

  private getCharacters(
    ids: number[]
  ): Observable<CharacterModel[]> {

    if (ids.length === 0) {
      return of([]);
    }

    const requests = ids.map(
      id => this.characterService.getCharacterById(id)
    );

    return forkJoin(requests);
  }


  // =========================================
  // OBTENER EPISODIOS
  // =========================================

  private getEpisodes(
    ids: number[]
  ): Observable<EpisodeModel[]> {

    if (ids.length === 0) {
      return of([]);
    }

    const requests = ids.map(
      id => this.episodeService.getEpisodeById(id)
    );

    return forkJoin(requests);
  }


  // =========================================
  // OBTENER UBICACIONES
  // =========================================

  private getLocations(
    ids: number[]
  ): Observable<LocationModel[]> {

    if (ids.length === 0) {
      return of([]);
    }

    const requests = ids.map(
      id => this.locationService.getLocationById(id)
    );

    return forkJoin(requests);
  }


  // =========================================
  // ELIMINAR PERSONAJE
  // =========================================

  removeCharacterFavorite(id: number): void {

    this.localStorageService.removeFavoriteCharacter(id);

    this.favoriteCharacters =
      this.favoriteCharacters.filter(
        character => character.id !== id
      );

    this.cdr.detectChanges();
  }


  // =========================================
  // ELIMINAR EPISODIO
  // =========================================

  removeEpisodeFavorite(id: number): void {

    this.localStorageService.removeFavoriteEpisode(id);

    this.favoriteEpisodes =
      this.favoriteEpisodes.filter(
        episode => episode.id !== id
      );

    this.cdr.detectChanges();
  }


  // =========================================
  // ELIMINAR UBICACIÓN
  // =========================================

  removeLocationFavorite(id: number): void {

    this.localStorageService.removeFavoriteLocation(id);

    this.favoriteLocations =
      this.favoriteLocations.filter(
        location => location.id !== id
      );

    this.cdr.detectChanges();
  }


  // =========================================
  // VACIAR TODOS LOS FAVORITOS
  // =========================================

  clearFavorites(): void {

    this.localStorageService.clearAllFavorites();

    this.favoriteCharacters = [];

    this.favoriteEpisodes = [];

    this.favoriteLocations = [];

    this.cdr.detectChanges();
  }


  // =========================================
  // TOTAL DE FAVORITOS
  // =========================================

  get totalFavorites(): number {

    return (
      this.favoriteCharacters.length +
      this.favoriteEpisodes.length +
      this.favoriteLocations.length
    );
  }

}