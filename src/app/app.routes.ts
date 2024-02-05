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
        redirectTo: '/start',
        pathMatch: 'full',
      },
    ],
  },
/*   {
    path: 'start',
    loadComponent: () => import('./tabs/start/start.page').then( m => m.StartPage)
  },
  {
    path: 'watchlist',
    loadComponent: () => import('./tabs/watchlist/watchlist.page').then( m => m.WatchlistPage)
  },
  {
    path: 'watching',
    loadComponent: () => import('./tabs/watching/watching.page').then( m => m.WatchingPage)
  },
  {
    path: 'watched',
    loadComponent: () => import('./tabs/watched/watched.page').then( m => m.WatchedPage)
  }, */

];
