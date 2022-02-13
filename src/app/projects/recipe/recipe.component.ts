import { Component, OnInit } from '@angular/core';
import { faLaptopHouse } from '@fortawesome/free-solid-svg-icons';

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
  searchResults: Set<any> = new Set()
  searchActive = false;
  constructor() { }

  ngOnInit(): void {
    this.setUpApp();
    this.getRandomDrink()
  }

  setUpApp() {
    let storedDrinks = this.getDrinksLS()
    storedDrinks.forEach(async (drinkId: any) => {
      this.favoriteDrinks.add(await this.getDrinkById(drinkId));
    });
  }
  removeFavorite(drink: any) {
    if (this.currentDrink.idDrink === drink.idDrink)
      this.isFavorite = !this.isFavorite

    this.favoriteDrinks.delete(drink)
    this.removeDrinkLS(drink.idDrink)
  }
  setFavorite(drink: any) {
    //this.searchActive = false;
    let drinkIds = this.getDrinksLS()

    if (drinkIds.includes(drink.idDrink)) {
      this.favoriteDrinks.forEach((item: any) => {
        if (item.idDrink === drink.idDrink) {
          this.favoriteDrinks.delete(item)
          this.removeFavorite(drink)
          this.removeDrinkLS(this.currentDrink.idDrink)
        }
      })
      return;
    }
    else {
      this.favoriteDrinks.add(drink);
      this.addDrink(drink, false)
      this.addDrinkLS(this.currentDrink.idDrink)
    }
  }
  addDrink(drink: any, random: boolean = false) {
    //this.searchActive = false;
    this.random = random;
    this.currentDrink = drink;
    this.isFavorite = (this.favoriteDrinks.has(this.currentDrink));
  }
  addDrinkLS(drinkId: any) {
    let drinkIds = this.getDrinksLS()
    if (drinkIds.includes(drinkId))
      return;
    localStorage.setItem('drinkIds', JSON.stringify([...drinkIds, drinkId]))
  }
  removeDrinkLS(drinkId: string) {
    //this.searchActive = false;
    let drinkIds = this.getDrinksLS()
    localStorage.setItem('drinkIds', JSON.stringify(drinkIds.filter((id: any) => id !== drinkId)))
  }
  getDrinksLS() {
    let drinkIds = JSON.parse(localStorage.getItem('drinkIds') || '[]');
    if (!drinkIds) return;

    return drinkIds
  }
  isInFavorites(drink: any) {
    let drinkIds = this.getDrinksLS()
    console.log(drink?.idDrink)
    if (drinkIds.includes(drink?.idDrink))
      return true;

    return false;
  }
  showDrink(drink: any) {
    this.searchActive = false;
    this.addDrink(drink)
  }
  async getDrinkById(id: string) {
    let resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id);
    let respData = await resp.json()
    let drink = await respData.drinks[0]

    return drink
  }
  async getDrinksBySearch(term: string) {
    this.searchResults.clear()
    let respData = await (await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + term)).json()
    let drink = respData.drinks[0]
    let drinks = respData.drinks
    //this.addDrink(drink, false);

    for (const drink in drinks) {
      if (Object.prototype.hasOwnProperty.call(drinks, drink)) {
        const element = drinks[drink];
        this.searchResults.add(element);
      }
    }
    this.searchActive = true;
  }

  async getRandomDrink() {
    let resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    let respData = await resp.json()
    let randomDrink = respData.drinks[0];

    this.addDrink(randomDrink, true);
  }
}
