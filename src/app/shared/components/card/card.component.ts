import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { CommonModule, UpperCasePipe } from '@angular/common';

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon
} from '@ionic/angular';

import {
  heart,
  heartOutline
} from 'ionicons/icons';

import { addIcons } from 'ionicons';

import { StatusTextPipe } from '../../pipes/status-text-pipe';

import { LocalStorageService } from '../../../core/services/local-storage';

export type FavoriteType =
  | 'character'
  | 'episode'
  | 'location';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    UpperCasePipe,

    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonIcon,

    StatusTextPipe
  ]
})
export class CardComponent implements OnInit {

  // =========================
  // DATOS DE LA CARD
  // =========================

  @Input() title: string = '';

  @Input() image?: string = '';

  @Input() subtitle: string = '';

  @Input() description: string = '';


  // =========================
  // FAVORITOS
  // =========================

  /**
   * ID del personaje, episodio o ubicación
   */
  @Input() itemId?: number;


  /**
   * Tipo de elemento
   */
  @Input() favoriteType?: FavoriteType;


  /**
   * Indica si actualmente es favorito
   */
  isFavorite: boolean = false;


  constructor(
    private localStorageService: LocalStorageService
  ) {

    addIcons({
      heart,
      heartOutline
    });

  }


  ngOnInit(): void {

    this.checkFavorite();

  }


  // =========================
  // VERIFICAR FAVORITO
  // =========================

  checkFavorite(): void {

    // Si no tenemos ID o tipo,
    // no podemos trabajar con favoritos
    if (
      this.itemId === undefined ||
      !this.favoriteType
    ) {

      this.isFavorite = false;

      return;
    }


    switch (this.favoriteType) {

      case 'character':

        this.isFavorite =
          this.localStorageService
            .getFavoriteCharacters()
            .includes(this.itemId);

        break;


      case 'episode':

        this.isFavorite =
          this.localStorageService
            .getFavoriteEpisodes()
            .includes(this.itemId);

        break;


      case 'location':

        this.isFavorite =
          this.localStorageService
            .getFavoriteLocations()
            .includes(this.itemId);

        break;

    }

  }


  // =========================
  // AGREGAR / ELIMINAR
  // =========================

  toggleFavorite(event: Event): void {

    // Evita que el click del corazón
    // afecte otros eventos de la card
    event.stopPropagation();


    if (
      this.itemId === undefined ||
      !this.favoriteType
    ) {

      return;

    }


    // =========================
    // SI YA ES FAVORITO
    // =========================

    if (this.isFavorite) {

      this.removeFavorite();

      return;

    }


    // =========================
    // SI NO ES FAVORITO
    // =========================

    this.addFavorite();

  }


  // =========================
  // AGREGAR
  // =========================

  private addFavorite(): void {

    if (this.itemId === undefined) {
      return;
    }


    switch (this.favoriteType) {

      case 'character':

        this.localStorageService
          .addFavoriteCharacter(this.itemId);

        break;


      case 'episode':

        this.localStorageService
          .addFavoriteEpisode(this.itemId);

        break;


      case 'location':

        this.localStorageService
          .addFavoriteLocation(this.itemId);

        break;

    }


    // Cambiamos visualmente el corazón
    this.isFavorite = true;

  }


  // =========================
  // ELIMINAR
  // =========================

  private removeFavorite(): void {

    if (this.itemId === undefined) {
      return;
    }


    switch (this.favoriteType) {

      case 'character':

        this.localStorageService
          .removeFavoriteCharacter(this.itemId);

        break;


      case 'episode':

        this.localStorageService
          .removeFavoriteEpisode(this.itemId);

        break;


      case 'location':

        this.localStorageService
          .removeFavoriteLocation(this.itemId);

        break;

    }


    // Cambiamos visualmente el corazón
    this.isFavorite = false;

  }

}