import { Component, OnInit } from '@angular/core';
 import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol
 } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { CardComponent } from "src/app/shared/components/card/card.component";
import { CharacterService } from "src/app/core/services/character-service";
import { Character } from "src/app/core/models/character.model";
import { ApiResponse } from "src/app/core/models/api-response.model";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    FormsModule, 
    HeaderComponent, 
    CardComponent,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class CharactersPage implements OnInit {
 characters: Character[] = [];
 responseApi: ApiResponse<Character>= { info: { count: 0, pages: 0, next: "", prev: "" }, results: [] };

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.characterService.getCharacters().subscribe((data) => {
      this.characters = data.results;
      this.responseApi = data;
      console.log('Characters:', this.characters);
      console.log('API Response:', this.responseApi);
    });
  }

}
