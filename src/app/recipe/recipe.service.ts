import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private listUrl = 'https://raw.githubusercontent.com/2603-Uniandes/jsons/refs/heads/main/2025-10%20Recetas/recipe.json';
  private detailBaseUrl = 'https://raw.githubusercontent.com/2603-Uniandes/jsons/refs/heads/main/2025-10%20Recetas';

  constructor(private http: HttpClient) {}

  // 🔸 Función para listar todas las recetas
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.listUrl);
  }

  // 🔸 Función para consultar el detalle de una receta por id
  getRecipeById(id: number): Observable<Recipe> {
    const url = `${this.detailBaseUrl}/${id}/recipe.json`;
    return this.http.get<Recipe>(url);
  }
}
