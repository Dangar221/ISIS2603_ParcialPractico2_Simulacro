import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { RecipeService } from '../recipe.service';
import { Recipe } from '../Recipe';


@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
 recipe?: Recipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getRecipeById(id).subscribe({
      next: (data) => this.recipe = data
    });
  }
  // 🔸 Función para calcular el ingrediente más usado
  mostUsedIngredient(): string | undefined {
    if (!this.recipe?.ingredientes || this.recipe.ingredientes.length === 0) return undefined;

    const parseQty = (cantidad: string): number => {
      const match = cantidad.match(/\d+(\.\d+)?/);
      return match ? Number(match[0]) : 0;
    };

    const sorted = [...this.recipe.ingredientes].sort(
      (a, b) => parseQty(b.cantidad) - parseQty(a.cantidad)
    );

    return sorted[0].nombre;
  }
}
