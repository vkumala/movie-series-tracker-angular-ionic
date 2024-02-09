import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
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

  getDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}person/${id}?api_key=${this.apiKey}`)
  }

  getCombinedCredits(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}person/${id}/combined_credits?api_key=${this.apiKey}`)
  }

  getTVCredits(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}person/${id}/tv_credits?api_key=${this.apiKey}`)
  }

  getMovieCredits(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}person/${id}/movie_credits?api_key=${this.apiKey}`)
  }


}
