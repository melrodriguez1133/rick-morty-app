import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular';

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
export class EpisodePage {

  episodes: EpisodeModel[] = [];

  filters: EpisodeFilters = {};

  loading = false;

  constructor(
    private episodeService: EpisodeService,
    private cdr: ChangeDetectorRef
  ) {}

  ionViewWillEnter(): void {
    console.log('🟢 Entrando a Episodes');

    this.loadEpisodes();
  }

  loadEpisodes(): void {

    console.log('🔵 Cargando episodes...');

    this.loading = true;

    this.episodeService
      .getFilteredEpisodes(this.filters)
      .subscribe({

        next: (response: ApiResponse<EpisodeModel>) => {

          console.log('📦 Episodes:', response);

          this.episodes = response.results;

          console.log(
            '🎬 Total episodes:',
            this.episodes.length
          );

          this.loading = false;

          this.cdr.detectChanges();
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
}