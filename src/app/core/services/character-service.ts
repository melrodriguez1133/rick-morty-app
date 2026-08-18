import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Character } from '../models/character.model';
import { environment } from '../../../environments/environment';
import { CharacterFilters } from '../interface/character-filters.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {

  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  getCharacters(page: number = 1): Observable<ApiResponse<Character>> {
    return this.http.get<ApiResponse<Character>>(`${this.apiUrl}/character?page=${page}`);
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(
      `${this.apiUrl}/${id}`
    );
  }

  getCharactersByIds(ids: number[]): Observable<Character[]> {
    const idsString = ids.join(',');
    return this.http.get<Character[]>(`${this.apiUrl}/character/${idsString}`);
  }

  getFilteredCharacters(filters: CharacterFilters, page: number = 1): Observable<ApiResponse<Character>> {
    const queryParams = new URLSearchParams(filters as any).toString();
    return this.http.get<ApiResponse<Character>>(`${this.apiUrl}/character?page=${page}&${queryParams}`);
  }
}
