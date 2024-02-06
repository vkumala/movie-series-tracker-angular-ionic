import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  key: string;
  data: Array<any>;

  constructor() {
    this.key = 'babi-watch-tracker';
    if (localStorage.getItem(this.key) === null) {
      localStorage.setItem(this.key, JSON.stringify([]))
      this.data = []
    } else {
      this.data = JSON.parse(localStorage.getItem(this.key) || '[]')
    }
  }

  public addToWatchlist(type, id) {
    console.log("this.data", this.data)
    const index = this.data.findIndex(p => p.id === id && p.type === type)
    if (index < 0) {
      this.data.push({ 'id': id, 'type': type, 'status': 'watchlist', 'timestamp_watchlist': new Date() })

    } else {
      this.data[index]['status'] = 'watchlist';
      this.data[index]['timestamp_watchlist'] = new Date();
    }      localStorage.setItem(this.key, JSON.stringify(this.data));
    //TODO: if id already there

  }
  public addToWatching(type, id) {
    const index = this.data.findIndex(p => p.id === id && p.type === type)
    if (index < 0) {
      this.data.push({ 'id': id, 'type': type, 'status': 'watching', 'timestamp_watching': new Date() })
    } else {
      this.data[index]['status'] = 'watching';
      this.data[index]['timestamp_watching'] = new Date();
    }
    localStorage.setItem(this.key, JSON.stringify(this.data));
  }
  public addToWatched(type, id) {
    const index = this.data.findIndex(p => p.id === id && p.type === type)
    if (index < 0) {
      this.data.push({ 'id': id, 'type': type,'status': 'watched', 'timestamp_watched': new Date() })
    } else {
      this.data[index]['status'] = 'watched';
      this.data[index]['timestamp_watched'] = new Date();
    }
    localStorage.setItem(this.key, JSON.stringify(this.data));
  }

  public addRating(type, id, rating, note = '') {
    const index = this.data.findIndex(p => p.id === id && p.type === type)
    if (index < 0) {
      this.data.push({ 'id': id, 'type': type,'status': 'watched', 'rating': rating, 'note': note, 'timestamp_rated': new Date() })
    } else {
      this.data[index]['status'] = 'watched';
      this.data[index]['rating'] = rating;
      this.data[index]['note'] = note;
      this.data[index]['timestamp_rated'] = new Date();
    }
    localStorage.setItem(this.key, JSON.stringify(this.data));
  }

  public addToAbandoned(type, id, note = '') {
    const index = this.data.findIndex(p => p.id === id && p.type === type)
    if (index < 0) {
      this.data.push({ 'id': id, 'type': type,'status': 'abandoned', 'note': note, 'timestamp_abandoned': new Date() })
    } else {
      this.data[index]['status'] = 'abandoned';
      this.data[index]['note'] = note;
      this.data[index]['timestamp_abandoned'] = new Date();
    }
    localStorage.setItem(this.key, JSON.stringify(this.data));
  }

  public getWatchlist() {
    return this.data.filter(e => e.status === 'watchlist');
  }
  public getWatching() {
    return this.data.filter(e => e.status === 'watching');
  }
  public getWatched() {
    return this.data.filter(e => e.status === 'watched');
  }
  public getRated() {
    return this.data.filter(e => e.status === 'watched' && 'rating' in e);
  }
  public getAbandoned() {
    return this.data.filter(e => e.status === 'abandoned');
  }

  public addData(id: number, status: string) {
    let data = JSON.parse(localStorage.getItem(this.key) || '{}')
    //let item = data.find(item => item.id === id)

  }

  public saveData(key: string, value: Object) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getData(key: string) {
    return JSON.parse(localStorage.getItem(key) || '{}')
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
