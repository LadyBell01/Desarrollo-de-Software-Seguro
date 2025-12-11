import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesMockService } from 'src/app/services/favorites-mock.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Meal } from 'src/app/interfaces';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: false
})
export class FavoritesPage implements OnInit {

  favoriteRecipes: Meal[] = [];
  filteredRecipes: Meal[] = [];
  searchQuery = '';
  loading = true;

  constructor(
    private router: Router,
    private favoritesService: FavoritesMockService,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.loadFavorites();
  }

  ionViewWillEnter() {
    // Reload favorites when entering the page
    this.loadFavorites();
  }

  loadFavorites() {
    this.loading = true;
    const favoriteIds = this.favoritesService.getFavorites();

    if (favoriteIds.length === 0) {
      this.favoriteRecipes = [];
      this.filteredRecipes = [];
      this.loading = false;
      return;
    }

    // Fetch all favorite recipes
    const requests = favoriteIds.map(id => this.recipeService.getMealById(id));

    forkJoin(requests).subscribe({
      next: (meals) => {
        this.favoriteRecipes = meals.filter(m => m !== null) as Meal[];
        this.filteredRecipes = [...this.favoriteRecipes];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading favorites:', err);
        this.loading = false;
      }
    });
  }

  onSearch(event: any) {
    const query = event.target.value?.toLowerCase() || '';
    this.searchQuery = query;

    if (query.trim() === '') {
      this.filteredRecipes = [...this.favoriteRecipes];
    } else {
      this.filteredRecipes = this.favoriteRecipes.filter(recipe =>
        recipe.strMeal.toLowerCase().includes(query) ||
        recipe.strCategory?.toLowerCase().includes(query) ||
        recipe.strArea?.toLowerCase().includes(query)
      );
    }
  }

  openRecipe(id: string) {
    this.router.navigate(['/recipe-detail'], { queryParams: { id } });
  }

  removeFavorite(id: string, event: Event) {
    event.stopPropagation();
    this.favoritesService.removeFavorite(id);
    this.favoriteRecipes = this.favoriteRecipes.filter(r => r.idMeal !== id);
    this.filteredRecipes = this.filteredRecipes.filter(r => r.idMeal !== id);
  }

}
