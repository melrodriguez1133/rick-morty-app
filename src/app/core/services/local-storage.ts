import { Injectable } from '@angular/core';
import { ProfileModel } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  // =========================
  // FAVORITOS
  // =========================

  private readonly CHARACTER_KEY = 'favorite_characters';
  private readonly EPISODE_KEY = 'favorite_episodes';
  private readonly LOCATION_KEY = 'favorite_locations';


  // =========================
  // PERFIL
  // =========================

  private readonly PROFILE_KEY = 'user_profile';


  // =====================================================
  // CHARACTER FAVORITES
  // =====================================================

  getFavoriteCharacters(): number[] {
    return this.getIds(this.CHARACTER_KEY);
  }

  addFavoriteCharacter(id: number): void {
    this.addId(this.CHARACTER_KEY, id);
  }

  removeFavoriteCharacter(id: number): void {
    this.removeId(this.CHARACTER_KEY, id);
  }


  // =====================================================
  // EPISODE FAVORITES
  // =====================================================

  getFavoriteEpisodes(): number[] {
    return this.getIds(this.EPISODE_KEY);
  }

  addFavoriteEpisode(id: number): void {
    this.addId(this.EPISODE_KEY, id);
  }

  removeFavoriteEpisode(id: number): void {
    this.removeId(this.EPISODE_KEY, id);
  }


  // =====================================================
  // LOCATION FAVORITES
  // =====================================================

  getFavoriteLocations(): number[] {
    return this.getIds(this.LOCATION_KEY);
  }

  addFavoriteLocation(id: number): void {
    this.addId(this.LOCATION_KEY, id);
  }

  removeFavoriteLocation(id: number): void {
    this.removeId(this.LOCATION_KEY, id);
  }


  // =====================================================
  // LIMPIAR FAVORITOS
  // =====================================================

  clearFavoriteCharacters(): void {
    localStorage.removeItem(this.CHARACTER_KEY);
  }

  clearFavoriteEpisodes(): void {
    localStorage.removeItem(this.EPISODE_KEY);
  }

  clearFavoriteLocations(): void {
    localStorage.removeItem(this.LOCATION_KEY);
  }

  clearAllFavorites(): void {
    localStorage.removeItem(this.CHARACTER_KEY);
    localStorage.removeItem(this.EPISODE_KEY);
    localStorage.removeItem(this.LOCATION_KEY);
  }


  // =====================================================
  // PERFIL
  // =====================================================

  getProfile(): ProfileModel | null {

    const data = localStorage.getItem(this.PROFILE_KEY);

    if (!data) {
      return null;
    }

    try {

      const parsed: ProfileModel = JSON.parse(data);

      return parsed;

    } catch (error) {

      console.error(
        'Error leyendo perfil:',
        error
      );

      return null;

    }
  }


  saveProfile(profile: ProfileModel): void {

    localStorage.setItem(
      this.PROFILE_KEY,
      JSON.stringify(profile)
    );

  }


  clearProfile(): void {

    localStorage.removeItem(
      this.PROFILE_KEY
    );

  }


  // =====================================================
  // MÉTODOS INTERNOS DE FAVORITOS
  // =====================================================

  private getIds(key: string): number[] {

    const data = localStorage.getItem(key);

    if (!data) {
      return [];
    }

    try {

      const parsed: unknown = JSON.parse(data);

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .map(id => Number(id))
        .filter(
          id =>
            Number.isInteger(id) &&
            id > 0
        );

    } catch (error) {

      console.error(
        `Error leyendo LocalStorage: ${key}`,
        error
      );

      return [];

    }
  }


  private addId(
    key: string,
    id: number
  ): void {

    if (
      !Number.isInteger(id) ||
      id <= 0
    ) {

      console.warn(
        `ID inválido para favoritos: ${id}`
      );

      return;
    }

    const ids = this.getIds(key);

    if (ids.includes(id)) {
      return;
    }

    ids.push(id);

    localStorage.setItem(
      key,
      JSON.stringify(ids)
    );

  }


  private removeId(
    key: string,
    id: number
  ): void {

    const ids = this.getIds(key);

    const updatedIds = ids.filter(
      favoriteId =>
        favoriteId !== id
    );

    if (updatedIds.length === 0) {

      localStorage.removeItem(key);

      return;
    }

    localStorage.setItem(
      key,
      JSON.stringify(updatedIds)
    );

  }

}