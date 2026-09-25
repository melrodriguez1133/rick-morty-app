import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocationModel } from '../models/location.model';
import { ApiResponse } from '../models/api-response.model';
import { LocationFilters } from '../interface/location-filter.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  // ALL LOCATIONS
  getLocations(page: number = 1): Observable<ApiResponse<LocationModel>> {

    const params = new HttpParams()
      .set('page', page);

    return this.http.get<ApiResponse<LocationModel>>(
      `${this.apiUrl}/location`,
      { params }
    );
  }

  // LOCATION BY ID
  getLocationById(id: number): Observable<LocationModel> {

    return this.http.get<LocationModel>(
      `${this.apiUrl}/location/${id}`
    );
  }

  // GET LOCATIONS BY IDS
  getLocationsByIds(ids: number[]): Observable<LocationModel[]> {

    const idsString = ids.join(',');

    return this.http.get<LocationModel[]>(
      `${this.apiUrl}/location/${idsString}`
    );
  }

  // FILTER LOCATIONS
  getFilteredLocations(
    filters: LocationFilters,
    page: number = 1
  ): Observable<ApiResponse<LocationModel>> {

    let params = new HttpParams()
      .set('page', page);

    if (filters.name?.trim()) {
      params = params.set(
        'name',
        filters.name.trim()
      );
    }

    if (filters.type?.trim()) {
      params = params.set(
        'type',
        filters.type.trim()
      );
    }

    if (filters.dimension?.trim()) {
      params = params.set(
        'dimension',
        filters.dimension.trim()
      );
    }

    return this.http.get<ApiResponse<LocationModel>>(
      `${this.apiUrl}/location`,
      { params }
    );
  }
}