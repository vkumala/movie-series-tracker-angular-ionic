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
          import('./tabs/start/start.page').then((m) => m.StartPage),
      },
      {
        path: 'watchlist',
        loadComponent: () =>
          import('./tabs/watchlist/watchlist.page').then((m) => m.WatchlistPage),
      },
      {
        path: 'now_watching',
        loadComponent: () =>
          import('./tabs/watching/watching.page').then((m) => m.WatchingPage),
      },
      {
        path: 'watched',
        loadComponent: () =>
          import('./tabs/watched/watched.page').then((m) => m.WatchedPage),
      },

      {
        path: 'person/:id',
        loadComponent: () => import('./person/person.page').then( m => m.PersonPage)
      },
      {
        path: ':type/:id',
        loadComponent: () =>
          import('./details/movie/movie.page').then((m) => m.MoviePage),
      },
      {
        path: '',
        redirectTo: '/start',
        pathMatch: 'full',
      },
    ],
  },


];
