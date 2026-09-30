import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import {
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/angular';

import {
  arrowBackOutline,
  locationOutline,
  planetOutline,
  maleFemaleOutline,
  filmOutline
} from 'ionicons/icons';

import { addIcons } from 'ionicons';

import { CharacterService } from '../../core/services/character-service';
import { EpisodeService } from '../../core/services/episode-service';

import { CharacterModel } from '../../core/models/character.model';
import { EpisodeModel } from '../../core/models/episode.model';

import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon,
    LoadingComponent
  ]
})
export class CharacterDetailPage implements OnInit {

  character: CharacterModel | null = null;

  episodes: EpisodeModel[] = [];

  loading = false;
  loadingEpisodes = false;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService,
    private episodeService: EpisodeService,
    private cdr: ChangeDetectorRef
  ) {

    addIcons({
      arrowBackOutline,
      locationOutline,
      planetOutline,
      maleFemaleOutline,
      filmOutline
    });

  }

  ngOnInit(): void {
    this.loadCharacter();
  }

  loadCharacter(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {

      this.error = true;
      this.loading = false;

      this.cdr.detectChanges();

      return;
    }

    this.loading = true;
    this.error = false;
    this.character = null;
    this.episodes = [];

    this.characterService
      .getCharacterById(id)
      .subscribe({

        next: (response: CharacterModel) => {

          this.character = response;
          this.loading = false;

          this.loadEpisodes(response);

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Error loading character:',
            error
          );

          this.character = null;
          this.error = true;
          this.loading = false;

          this.cdr.detectChanges();
        }

      });
  }

  loadEpisodes(character: CharacterModel): void {

    if (!character.episode?.length) {
      this.episodes = [];
      return;
    }

    this.loadingEpisodes = true;

    /*
     * La API devuelve algo como:
     *
     * https://rickandmortyapi.com/api/episode/1
     * https://rickandmortyapi.com/api/episode/2
     *
     * Extraemos solamente los IDs.
     */
    const episodeIds = character.episode
      .map(url => {
        const parts = url.split('/');
        return Number(parts[parts.length - 1]);
      })
      .filter(id => !isNaN(id));

    if (!episodeIds.length) {

      this.episodes = [];
      this.loadingEpisodes = false;

      this.cdr.detectChanges();

      return;
    }

    this.episodeService
      .getEpisodesByIds(episodeIds)
      .subscribe({

        next: (response: EpisodeModel[]) => {

          /*
           * Cuando solamente existe un episodio,
           * la API puede devolver un objeto en vez
           * de un array.
           *
           * Normalizamos ambos casos.
           */
          this.episodes = Array.isArray(response)
            ? response
            : [response];

          /*
           * Ordenamos por ID para mantener
           * el orden de aparición.
           */
          this.episodes.sort(
            (a, b) => a.id - b.id
          );

          this.loadingEpisodes = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Error loading episodes:',
            error
          );

          this.episodes = [];
          this.loadingEpisodes = false;

          this.cdr.detectChanges();
        }

      });
  }

  goBack(): void {

    this.router.navigate(['/character']);

  }

}