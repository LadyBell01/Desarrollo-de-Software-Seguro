import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RecipeService } from 'src/app/services/recipe.service';
import { FavoritesMockService } from 'src/app/services/favorites-mock.service';
import { Meal } from 'src/app/interfaces';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
  standalone: false
})
export class RecipeDetailPage implements OnInit {

  recipe: Meal | null = null;
  ingredients: { name: string; measure: string }[] = [];
  instructions: string[] = [];
  loading = true;
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private recipeService: RecipeService,
    private favoritesService: FavoritesMockService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.loadRecipe(id);
      this.isFavorite = this.favoritesService.isFavorite(id);
    }
  }

  loadRecipe(id: string) {
    this.loading = true;
    this.recipeService.getMealById(id).subscribe({
      next: (meal) => {
        this.recipe = meal;
        if (meal) {
          this.parseIngredients(meal);
          this.parseInstructions(meal.strInstructions || '');
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading recipe:', err);
        this.loading = false;
      }
    });
  }

  parseIngredients(meal: Meal) {
    this.ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = (meal as any)[`strIngredient${i}`];
      const measure = (meal as any)[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        this.ingredients.push({
          name: ingredient,
          measure: measure || ''
        });
      }
    }
  }

  parseInstructions(text: string) {
    // Split by newlines or periods for steps
    this.instructions = text
      .split(/\r?\n/)
      .filter(step => step.trim().length > 0)
      .map(step => step.trim());
  }

  goBack() {
    this.navCtrl.back();
  }

  toggleFavorite() {
    if (this.recipe) {
      this.favoritesService.toggleFavorite(this.recipe.idMeal);
      this.isFavorite = !this.isFavorite;
    }
  }

}
