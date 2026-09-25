import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EpisodeModel } from '../models/episode.model';
import { ApiResponse } from '../models/api-response.model';
import { EpisodeFilters } from '../interface/episode-filter.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  // ALL EPISODES
  getEpisodes(page: number = 1): Observable<ApiResponse<EpisodeModel>> {

    const params = new HttpParams()
      .set('page', page);

    return this.http.get<ApiResponse<EpisodeModel>>(
      `${this.apiUrl}/episode`,
      { params }
    );
  }

  // EPISODE BY ID
  getEpisodeById(id: number): Observable<EpisodeModel> {

    return this.http.get<EpisodeModel>(
      `${this.apiUrl}/episode/${id}`
    );
  }

  // GET EPISODES BY IDS
  getEpisodesByIds(ids: number[]): Observable<EpisodeModel[]> {

    const idsString = ids.join(',');

    return this.http.get<EpisodeModel[]>(
      `${this.apiUrl}/episode/${idsString}`
    );
  }

  // FILTER EPISODES
  getFilteredEpisodes(
    filters: EpisodeFilters,
    page: number = 1
  ): Observable<ApiResponse<EpisodeModel>> {

    let params = new HttpParams()
      .set('page', page);

    if (filters.name?.trim()) {
      params = params.set(
        'name',
        filters.name.trim()
      );
    }

    if (filters.episode?.trim()) {
      params = params.set(
        'episode',
        filters.episode.trim()
      );
    }

    return this.http.get<ApiResponse<EpisodeModel>>(
      `${this.apiUrl}/episode`,
      { params }
    );
  }
}