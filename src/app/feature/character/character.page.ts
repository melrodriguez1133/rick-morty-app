import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { CharacterService } from '../../core/services/character-service';
import { CharacterModel } from '../../core/models/character.model';
import { CharacterFilters } from '../../core/interface/character-filter.interface';
import { ApiResponse } from '../../core/models/api-response.model'; 
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export class CharacterPage implements OnInit {

  constructor(private characterService: CharacterService) { }

  characters: CharacterModel[] = [];
  filters: CharacterFilters = {};

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.characterService.getFilteredCharacters(this.filters).subscribe((response: ApiResponse<CharacterModel>) => {
      this.characters = response.results;
      console.log('Characters loaded:', this.characters);
    });
  }

}
