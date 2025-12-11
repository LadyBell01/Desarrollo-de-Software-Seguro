import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FavoritesMockService {
  private _favorites = new BehaviorSubject<string[]>([]);
  favorites$ = this._favorites.asObservable();

  constructor() {
    // Load initial favorites from localStorage if needed
    const stored = localStorage.getItem('favorites');
    if (stored) {
      this._favorites.next(JSON.parse(stored));
    }
  }

  getFavorites(): string[] {
    return this._favorites.value;
  }

  addFavorite(id: string) {
    const current = this._favorites.value;
    if (!current.includes(id)) {
      const updated = [...current, id];
      this._favorites.next(updated);
      this.saveToStorage(updated);
    }
  }

  removeFavorite(id: string) {
    const current = this._favorites.value;
    const updated = current.filter(favId => favId !== id);
    this._favorites.next(updated);
    this.saveToStorage(updated);
  }

  isFavorite(id: string): boolean {
    return this._favorites.value.includes(id);
  }

  isFavorite$(id: string): Observable<boolean> {
    return this.favorites$.pipe(
      map(favorites => favorites.includes(id))
    );
  }

  toggleFavorite(id: string) {
    if (this.isFavorite(id)) {
      this.removeFavorite(id);
    } else {
      this.addFavorite(id);
    }
  }

  private saveToStorage(favorites: string[]) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
