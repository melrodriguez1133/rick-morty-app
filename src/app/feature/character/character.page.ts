import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { CharacterService } from '../../core/services/character-service';
import { CharacterModel } from '../../core/models/character.model';
import { CharacterFilters } from '../../core/interface/character-filter.interface';
import { ApiResponse } from '../../core/models/api-response.model'; 
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CardComponent } from '../../shared/components/card/card.component';
import{ isAlive, isDead, hasLocation, hasOrigin, hasEpisodes, countEpisodes, isHuman, isAlien } from '../../shared/utils/character.util';
@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, CardComponent]
})
export class CharacterPage implements OnInit {

  characters: CharacterModel[] = [];
  filters: CharacterFilters = {};
  loading = false;

  constructor(
    private characterService: CharacterService
  ) {}

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {

    this.loading = true;

    this.characterService
      .getFilteredCharacters(this.filters)
      .subscribe({
        next: (response: ApiResponse<CharacterModel>) => {

          this.characters = response.results;

          console.log('Characters loaded:', this.characters);
          
          this.characters.forEach((character) => {
  console.log('-----------------------------------');
  console.log('Personaje:', character.name);

  console.log('¿Está vivo?:', isAlive(character));
  console.log('¿Está muerto?:', isDead(character));

  console.log('¿Tiene ubicación?:', hasLocation(character));
  console.log('¿Tiene origen?:', hasOrigin(character));

  console.log('¿Tiene episodios?:', hasEpisodes(character));
  console.log('Cantidad de episodios:', countEpisodes(character));

  console.log('¿Es humano?:', isHuman(character));
  console.log('¿Es alien?:', isAlien(character));
});

          this.loading = false;
        },

        error: (error) => {

          console.error('Error loading characters:', error);

          this.loading = false;
        }
      });
  }
}