import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../../environments/environment';
import { Episode } from '../models/episode.model';
@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEpisodes(page: number = 1): Observable<ApiResponse<Episode>> {
    return this.http.get<ApiResponse<Episode>>(`${this.apiUrl}/episode?page=${page}`);
  }

  getEpisodeById(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.apiUrl}/episode/${id}`);
  }   

  getEpisodesByIds(ids: number[]): Observable<Episode[]> {
    const idsString = ids.join(',');
    return this.http.get<Episode[]>(`${this.apiUrl}/episode/${idsString}`);
  }

  getFilteredEpisodes(filters: any, page: number = 1): Observable<ApiResponse<Episode>> {
    const queryParams = new URLSearchParams(filters).toString();
    return this.http.get<ApiResponse<Episode>>(`${this.apiUrl}/episode?page=${page}&${queryParams}`);
  }
}
