import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [

  {
    path: '',
    component: MainLayoutComponent,

    children: [

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },

      {
        path: 'home',
        loadComponent: () =>
          import('./feature/home/home.page')
            .then(m => m.HomePage)
      },

      {
        path: 'episode',
        loadComponent: () =>
          import('./feature/episode/episode.page')
            .then(m => m.EpisodePage)
      },

      {
        path: 'location',
        loadComponent: () =>
          import('./feature/location/location.page')
            .then(m => m.LocationPage)
      },

      {
        path: 'character',
        loadComponent: () =>
          import('./feature/character/character.page')
            .then(m => m.CharacterPage)
      },

      {
        path: 'favorite',
        loadComponent: () =>
          import('./feature/favorite/favorite.page')
            .then(m => m.FavoritePage)
      }

    ]
  }

];