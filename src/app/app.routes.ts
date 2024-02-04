import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'start',
        loadComponent: () =>
          import('./tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'watchlist',
        loadComponent: () =>
          import('./tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'now_watching',
        loadComponent: () =>
          import('./tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'watched',
        loadComponent: () =>
          import('./tab4/tab4.page').then((m) => m.Tab4Page),
      },

      {
        path: 'movie/:id',
        loadComponent: () =>
          import('./details/movie/movie.page').then((m) => m.MoviePage),
      },
      {
        path: 'tv-shows/:id',
        loadComponent: () =>
          import('./details/movie/movie.page').then((m) => m.MoviePage),
      },
      {
        path: '',
        redirectTo: '/movie',
        pathMatch: 'full',
      },
    ],
  },
];
