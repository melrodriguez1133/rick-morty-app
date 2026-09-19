import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import {CharacterModel} from '../models/character.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../../environments/environment';
import { CharacterFilters } from '../interface/character-filter.interface';
@Injectable({
    providedIn: 'root',

})
export class CharacterService {
    constructor(private http:HttpClient) { 
    }

    private apiUrl = environment.apiUrl;

    //ALL CHARACTERS
    getCharacters(page:number=1):Observable<ApiResponse<CharacterModel>>{
        const params = new HttpParams().set('page',page);
        return this.http.get<ApiResponse<CharacterModel>>(`${this.apiUrl}/character`,{params});
    }

    //CHARACTER BY ID
    getCharacterById(id:number):Observable<CharacterModel>{
        return this.http.get<CharacterModel>(`${this.apiUrl}/character/${id}`);
    }

    //GET CHARACTERS BY IDS
    getCharactersByIds(ids:number[]):Observable<CharacterModel[]>{
        const idsString = ids.join(',');
        return this.http.get<CharacterModel[]>(`${this.apiUrl}/character/${idsString}`);
    }

    //FILTER CHARACTERS
    getFilteredCharacters(
  filters: CharacterFilters,
  page: number = 1
): Observable<ApiResponse<CharacterModel>> {

  let params = new HttpParams()
    .set('page', page);

  if (filters.name?.trim()) {
    params = params.set(
      'name',
      filters.name.trim()
    );
  }

  if (filters.status) {
    params = params.set(
      'status',
      filters.status
    );
  }

  if (filters.species?.trim()) {
    params = params.set(
      'species',
      filters.species.trim()
    );
  }

  if (filters.type?.trim()) {
    params = params.set(
      'type',
      filters.type.trim()
    );
  }

  if (filters.gender) {
    params = params.set(
      'gender',
      filters.gender
    );
  }

  return this.http.get<ApiResponse<CharacterModel>>(
    `${this.apiUrl}/character`,
    { params }
  );
}
}
