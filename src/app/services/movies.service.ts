import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string;
  apiKey: string;
  language: string;
  region: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = '7de54a5896e6febb5edc13f9ac762b20';
    this.language = 'en-US';
    this.region = 'US'
  }


  getNowPlaying(page: number): Observable<any> {
    console.log(`${this.baseUrl}movie/now_playing?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`)
    return this.http.get(`${this.baseUrl}movie/now_playing?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`)
  }

  getPopular(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/popular?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`)
  }

  getUpcoming(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/upcoming?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`)
  }

  getTopRated(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/top_rated?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`)
  }

  getDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}?api_key=${this.apiKey}`)
  }

  getTrailerYoutubeId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/videos?api_key=${this.apiKey}`)
  }

  getCredits(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/credits?api_key=${this.apiKey}`)
  }
  getRecomendations(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${ id}/recommendations?api_key=${this.apiKey}`)
  }
}
