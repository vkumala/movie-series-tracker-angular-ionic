import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'movie/:id',
    loadComponent: () => import('./details/movie/movie.page').then( m => m.MoviePage)
  },
  {
    path: 'tv-show/:id',
    loadComponent: () => import('./details/tv-show/tv-show.page').then( m => m.TvShowPage)
  },
];
