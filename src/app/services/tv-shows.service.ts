import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {
  baseUrl: string;
  apiKey: string;
  language: string;
  region: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = '7de54a5896e6febb5edc13f9ac762b20';
    this.language = 'en-US';
    this.region = 'DE'
  }
  
  getAiringToday(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/airing_today?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`)
  }
 
  getOnTheAir(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/on_the_air?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`)
  }
 
  getPopular(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/popular?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`)
  }
 
  getTopRated(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/top_rated?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`)
  }

  getDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/${id}?api_key=${this.apiKey}`)
  }

  getTrailerYoutubeId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/${id}/videos?api_key=${this.apiKey}`)
  }
    
  getMultipleDetails(list: number[]): Observable<any> {
    let allAPI: any[] = [];
    for (const item of list) {
      let api = this.http.get(`${this.baseUrl}tv/${item['id']}?api_key=${this.apiKey}`)
      allAPI.push(api)
    }
    return forkJoin(allAPI)
  }
  getCredits(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/${id}/credits?api_key=${this.apiKey}`)
  }

}
