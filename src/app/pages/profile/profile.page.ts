import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FavoritesMockService } from 'src/app/services/favorites-mock.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Meal } from 'src/app/interfaces';
import { forkJoin } from 'rxjs';
import { AuthMockService } from 'src/app/services/auth-mock.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {

  user: any = null;
  favoriteRecipes: Meal[] = [];
  loading = true;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthMockService,
    private favoritesService: FavoritesMockService,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    // Get user from auth service
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });

    this.loadFavorites();
  }

  ionViewWillEnter() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.loading = true;
    const favoriteIds = this.favoritesService.getFavorites();

    if (favoriteIds.length === 0) {
      this.favoriteRecipes = [];
      this.loading = false;
      return;
    }

    // Fetch only first 6 for profile preview
    const requests = favoriteIds.slice(0, 6).map(id => this.recipeService.getMealById(id));

    forkJoin(requests).subscribe({
      next: (meals) => {
        this.favoriteRecipes = meals.filter(m => m !== null) as Meal[];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading favorites:', err);
        this.loading = false;
      }
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  openRecipe(id: string) {
    this.router.navigate(['/recipe-detail'], { queryParams: { id } });
  }

  goToFavorites() {
    this.router.navigate(['/recipes/tabs/favorites']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

}
