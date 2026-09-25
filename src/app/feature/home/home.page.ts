import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  arrowForwardOutline,
  peopleOutline,
  playCircleOutline,
  planetOutline
} from 'ionicons/icons';

import { CharacterService } from '../../core/services/character-service';
import { EpisodeService } from '../../core/services/episode-service';
import { LocationService } from '../../core/services/location-service';

import { CharacterModel } from '../../core/models/character.model';
import { EpisodeModel } from '../../core/models/episode.model';
import { LocationModel } from '../../core/models/location.model';

import { ApiResponse } from '../../core/models/api-response.model';

import { CardComponent } from '../../shared/components/card/card.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],

  imports: [
    CommonModule,
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
export class HomePage {

  characters: CharacterModel[] = [];

  episodes: EpisodeModel[] = [];

  locations: LocationModel[] = [];

  loading = false;

  private charactersLoaded = false;
  private episodesLoaded = false;
  private locationsLoaded = false;


  constructor(
    private characterService: CharacterService,
    private episodeService: EpisodeService,
    private locationService: LocationService,
    private cdr: ChangeDetectorRef
  ) {

    addIcons({
      arrowForwardOutline,
      peopleOutline,
      playCircleOutline,
      planetOutline
    });

  }


  ionViewWillEnter(): void {

    console.log('🏠 Entrando a Home');

    this.loadHome();

  }


  loadHome(): void {

    console.log('🔵 Cargando Home...');

    this.loading = true;

    this.charactersLoaded = false;
    this.episodesLoaded = false;
    this.locationsLoaded = false;


    // =========================
    // CHARACTERS
    // =========================

    this.characterService
      .getCharacters(1)
      .subscribe({

        next: (response: ApiResponse<CharacterModel>) => {

          this.characters =
            response.results.slice(0, 4);

          console.log(
            '👥 Characters:',
            this.characters
          );

          this.charactersLoaded = true;

          this.checkLoading();

        },

        error: (error) => {

          console.error(
            '❌ Error cargando characters:',
            error
          );

          this.characters = [];

          this.charactersLoaded = true;

          this.checkLoading();

        }

      });


    // =========================
    // EPISODES
    // =========================

    this.episodeService
      .getEpisodes(1)
      .subscribe({

        next: (response: ApiResponse<EpisodeModel>) => {

          this.episodes =
            response.results.slice(0, 4);

          console.log(
            '🎬 Episodes:',
            this.episodes
          );

          this.episodesLoaded = true;

          this.checkLoading();

        },

        error: (error) => {

          console.error(
            '❌ Error cargando episodes:',
            error
          );

          this.episodes = [];

          this.episodesLoaded = true;

          this.checkLoading();

        }

      });


    // =========================
    // LOCATIONS
    // =========================

    this.locationService
      .getLocations(1)
      .subscribe({

        next: (response: ApiResponse<LocationModel>) => {

          this.locations =
            response.results.slice(0, 4);

          console.log(
            '🌎 Locations:',
            this.locations
          );

          this.locationsLoaded = true;

          this.checkLoading();

        },

        error: (error) => {

          console.error(
            '❌ Error cargando locations:',
            error
          );

          this.locations = [];

          this.locationsLoaded = true;

          this.checkLoading();

        }

      });

  }


  private checkLoading(): void {

    if (
      this.charactersLoaded &&
      this.episodesLoaded &&
      this.locationsLoaded
    ) {

      this.loading = false;

      this.cdr.detectChanges();

      console.log(
        '✅ Home completamente cargado'
      );

    }

  }

}