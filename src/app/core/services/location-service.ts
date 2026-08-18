import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../../environments/environment';
import { Location } from '../models/location.model';
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLocations(page: number = 1): Observable<ApiResponse<Location>> {
    return this.http.get<ApiResponse<Location>>(`${this.apiUrl}/location?page=${page}`);
  }

  getLocationById(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.apiUrl}/location/${id}`);
  } 

  getLocationsByIds(ids: number[]): Observable<Location[]> {
    const idsString = ids.join(',');
    return this.http.get<Location[]>(`${this.apiUrl}/location/${idsString}`);
  }

  getFilteredLocations(filters: any, page: number = 1): Observable<ApiResponse<Location>> {
    const queryParams = new URLSearchParams(filters).toString();
    return this.http.get<ApiResponse<Location>>(`${this.apiUrl}/location?page=${page}&${queryParams}`);
  }

 }
