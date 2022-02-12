import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.sass']
})
export class RecipeComponent implements OnInit {

  drink: any;
  random: boolean = false;
  currentDrink: any;
  isFavorite: boolean = false;
  favoriteDrinks: Set<any> = new Set()
  constructor() { }

  ngOnInit(): void {
    this.setUpApp();
    this.getRandomDrink()
    console.log(this.favoriteDrinks)
  }

  setUpApp() {
    let storedDrinks = this.getDrinksFromLS()
    storedDrinks.forEach(async (drinkId: any) => {
      this.favoriteDrinks.add(await this.getDrinkById(drinkId));
    });
  }
  setFavorite(drink: any) {
    this.isFavorite = !this.isFavorite;

    if (this.isFavorite) {
      this.favoriteDrinks.add(drink);
      this.addDrinkToLS(this.currentDrink.idDrink)
    }
    else {
      this.favoriteDrinks.delete(drink);
      this.removeDrinkFromLS(this.currentDrink.idDrink)
    }
    console.log(this.favoriteDrinks)
  }
  addDrink(drink: any, random: boolean = false) {
    this.random = random;
    this.currentDrink = drink;
    this.isFavorite = (this.favoriteDrinks.has(this.currentDrink));
  }
  addDrinkToLS(drinkId: any) {
    let drinkIds = this.getDrinksFromLS()
    localStorage.setItem('drinkIds', JSON.stringify([...drinkIds, drinkId]))
    console.log('ls', drinkId)
  }
  removeDrinkFromLS(drinkId: string) {
    let drinkIds = this.getDrinksFromLS()
    localStorage.setItem('drinkIds', JSON.stringify(drinkIds.filter((id: any) => id !== drinkId)))
  }
  getDrinksFromLS() {
    let drinkIds = JSON.parse(localStorage.getItem('drinkIds') || '[]');
    if (!drinkIds) return;

    return drinkIds
  }
  async getDrinkById(id: string) {
    let resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id);
    let respData = await resp.json()
    let drink = await respData.drinks[0]

    return drink
  }
  async getDrinksBySearch(term: string) {
    let drinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + term)
  }

  async getRandomDrink() {
    let resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    let respData = await resp.json()
    let randomDrink = respData.drinks[0];

    this.addDrink(randomDrink, true);
  }
}
