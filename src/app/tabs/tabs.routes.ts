import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'rickiMorty',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../features/dashboard/dashboard.page').then((m) => m.DashboardPage),
      },
      {
        path: 'characters',
        loadComponent: () =>
          import('../features/characters/characters.page').then((m) => m.CharactersPage),
      },
      {
        path: 'episodes',
        loadComponent: () =>
          import('../features/episode/episode.page').then((m) => m.EpisodePage),
      },
      {
        path: 'locations',
        loadComponent: () =>
          import('../features/locations/locations.page').then((m) => m.LocationsPage),
      },
      {
        path: '',
        redirectTo: '/rickiMorty/dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/rickiMorty/dashboard',
    pathMatch: 'full',
  },
];
