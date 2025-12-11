import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { APIResponse, Meal, Category } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPopularMeals(): Observable<Meal[]> {
    // Simulating popular meals by fetching a specific category (e.g., Seafood)
    // or we could use 'search.php?s=' to get a variety if the API supports it without query.
    // 'filter.php?c=Seafood' returns simplified meal objects (id, name, thumb).
    // 'search.php?s=' returns full meal details.
    // Let's try 'search.php?s=' to get full details which might be better for a "Popular" section.
    // If that returns too many, we can slice it in the component.
    return this.http.get<APIResponse>(`${this.apiUrl}search.php?s=`).pipe(
      map(response => response.meals || [])
    );
  }

  searchMeals(query: string): Observable<Meal[]> {
    return this.http.get<APIResponse>(`${this.apiUrl}search.php?s=${query}`).pipe(
      map(response => response.meals || [])
    );
  }

  getMealById(id: string): Observable<Meal | null> {
    return this.http.get<APIResponse>(`${this.apiUrl}lookup.php?i=${id}`).pipe(
      map(response => response.meals ? response.meals[0] : null)
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<APIResponse>(`${this.apiUrl}categories.php`).pipe(
      map(response => response.categories || [])
    );
  }
}
