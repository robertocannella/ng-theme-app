import { Component, OnInit } from '@angular/core';
import { rollup } from 'd3';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.sass']
})
export class RecipeComponent implements OnInit {

  drink: any;
  random: boolean = false;
  currentDrinkImage: string = '';
  currentDrink: string = '';
  constructor() { }

  ngOnInit(): void {

    this.getRandomDrink()
  }

  async getRandomDrink() {
    let resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    let respData = await resp.json()
    let randomDrink = respData.drinks[0];

    this.addDrink(randomDrink, true);
  }
  addDrink(drink: any, random: boolean = false) {
    this.random = random;
    this.currentDrinkImage = drink.strDrinkThumb;
    this.currentDrink = drink.strDrink;
    console.log(this.random)
    console.log(drink)
  }
  async getDrinkById(id: string) {
    let drink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id);
  }
  async getDrinksBySearch(term: string) {
    let drinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + term)
  }
}
