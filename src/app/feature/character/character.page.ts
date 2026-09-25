import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCol,
  IonRow,
  IonGrid
} from '@ionic/angular';

import { CharacterService } from '../../core/services/character-service';
import { CharacterModel } from '../../core/models/character.model';
import { CharacterFilters } from '../../core/interface/character-filter.interface';
import { ApiResponse } from '../../core/models/api-response.model';

import { CardComponent } from '../../shared/components/card/card.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

import {
  isAlive,
  isDead,
  hasLocation,
  hasOrigin,
  hasEpisodes,
  countEpisodes,
  isHuman,
  isAlien
} from '../../shared/utils/character.util';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CardComponent,
    LoadingComponent,
      IonCol,
  IonRow,
  IonGrid
  ]
})
export class CharacterPage {

  characters: CharacterModel[] = [];

  filters: CharacterFilters = {};

  loading = false;

  constructor(
    private characterService: CharacterService,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Ionic ejecuta esto cada vez que entramos
   * nuevamente a la página.
   */
  ionViewWillEnter(): void {
    console.log('🟢 Entrando a Characters');

    this.loadCharacters();
  }

  /**
   * Cargar personajes
   */
  loadCharacters(): void {

    console.log('🔵 Cargando personajes...');

    this.loading = true;

    this.characterService
      .getFilteredCharacters(this.filters)
      .subscribe({

        next: (response: ApiResponse<CharacterModel>) => {

          console.log('📦 Respuesta API:', response);

          this.characters = response.results;

          console.log(
            '👥 Total personajes:',
            this.characters.length
          );

          this.testCharacterUtils();

          this.loading = false;

          /*
           * Forzamos a Angular a actualizar la vista.
           * Esto evita el problema que puede aparecer
           * con los lifecycle hooks de Ionic.
           */
          this.cdr.detectChanges();

          console.log('🟢 Vista actualizada');
        },

        error: (error) => {

          console.error(
            '❌ Error cargando personajes:',
            error
          );

          this.characters = [];

          this.loading = false;

          this.cdr.detectChanges();
        }

      });
  }

  /**
   * Pruebas de los utilitarios
   */
  private testCharacterUtils(): void {

    this.characters.forEach((character) => {

      console.log('-----------------------------------');

      console.log(
        '👤 Personaje:',
        character.name
      );

      console.log(
        '🟢 ¿Está vivo?:',
        isAlive(character)
      );

      console.log(
        '🔴 ¿Está muerto?:',
        isDead(character)
      );

      console.log(
        '📍 ¿Tiene ubicación?:',
        hasLocation(character)
      );

      console.log(
        '🌎 ¿Tiene origen?:',
        hasOrigin(character)
      );

      console.log(
        '🎬 ¿Tiene episodios?:',
        hasEpisodes(character)
      );

      console.log(
        '📺 Cantidad de episodios:',
        countEpisodes(character)
      );

      console.log(
        '👨 ¿Es humano?:',
        isHuman(character)
      );

      console.log(
        '👽 ¿Es alien?:',
        isAlien(character)
      );

    });
  }
}