import { CharacterModel } from '../../core/models/character.model';

export function isAlive(character: CharacterModel): boolean {
  return character.status.toLowerCase() === 'alive';
}

export function isDead(character: CharacterModel): boolean {
  return character.status.toLowerCase() === 'dead';
}

export function hasLocation(character: CharacterModel): boolean {
  return !!character.location?.name;
}

export function hasOrigin(character: CharacterModel): boolean {
  return !!character.origin?.name;
}

export function hasEpisodes(character: CharacterModel): boolean {
  return character.episode.length > 0;
}

export function countEpisodes(character: CharacterModel): number {
  return character.episode.length;
}

export function isHuman(character: CharacterModel): boolean {
  return character.species.toLowerCase() === 'human';
}

export function isAlien(character: CharacterModel): boolean {
  return character.species.toLowerCase() === 'alien';
}