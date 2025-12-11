import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { FavoritesMockService } from '../services/favorites-mock.service';
import { Meal, Category } from '../interfaces';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  popularRecipes: Meal[] = [];
  allRecipes: Meal[] = [];
  filteredRecipes: Meal[] = [];
  categories: Category[] = [];
  selectedCategory: string = '';
  searchQuery = '';
  loading = true;
  favoriteIds: string[] = [];

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private favoritesService: FavoritesMockService,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    this.loadRecipes();
    this.loadCategories();

    // Subscribe to favorites changes
    this.favoritesService.favorites$.subscribe(favorites => {
      this.favoriteIds = favorites;
    });
  }

  ionViewWillEnter() {
    // Refresh favorites when entering the page
    this.favoriteIds = this.favoritesService.getFavorites();
  }

  loadRecipes() {
    this.loading = true;
    this.recipeService.getPopularMeals().subscribe({
      next: (meals) => {
        this.allRecipes = meals || [];
        // Take first 10 for popular section
        this.popularRecipes = this.allRecipes.slice(0, 10);
        // Rest for main list
        this.filteredRecipes = this.allRecipes.slice(10, 30);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading recipes:', err);
        this.loading = false;
      }
    });
  }

  loadCategories() {
    this.recipeService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories || [];
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  async showFilterOptions() {
    const buttons = this.categories.slice(0, 10).map(cat => ({
      text: cat.strCategory,
      handler: () => {
        this.filterByCategory(cat.strCategory);
      }
    }));

    buttons.unshift({
      text: 'Todas',
      handler: () => {
        this.filterByCategory('');
      }
    });

    buttons.push({
      text: 'Cancelar',
      handler: () => { }
    });

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Filtrar por Categoría',
      buttons: buttons
    });

    await actionSheet.present();
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === '') {
      this.filteredRecipes = this.allRecipes.slice(10, 30);
    } else {
      this.filteredRecipes = this.allRecipes.filter(recipe =>
        recipe.strCategory === category
      );
    }
  }

  onSearch(event: any) {
    const query = event.target.value?.toLowerCase() || '';
    this.searchQuery = query;

    if (query.trim() === '') {
      this.filteredRecipes = this.allRecipes.slice(10, 30);
    } else {
      this.recipeService.searchMeals(query).subscribe({
        next: (meals) => {
          this.filteredRecipes = meals || [];
        },
        error: (err) => {
          console.error('Error searching:', err);
        }
      });
    }
  }

  openRecipe(id: string) {
    this.router.navigate(['/recipe-detail'], { queryParams: { id } });
  }

  isFavorite(id: string): boolean {
    return this.favoriteIds.includes(id);
  }

  toggleFavorite(id: string, event: Event) {
    event.stopPropagation();
    this.favoritesService.toggleFavorite(id);
  }

}
