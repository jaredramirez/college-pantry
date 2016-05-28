import {Page, NavController, Loading, Alert} from 'ionic-angular';
import {ResultsPage} from './../results/results';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav, food2fork) {
    this.nav = nav;
    this.ingredients = [{ingredient: ''}];
  }

  addIngredient() {
    this.ingredients.push({ingredient: ''});
  }

  removeIngredient(ingredient) {
    if(this.ingredients.length>1){
      for(let i = 0; i < this.ingredients.length; i++) {
        if(this.ingredients[i] == ingredient){
          this.ingredients.splice(i, 1);
        }
      }
    }
  }

  calcuateResults() {
    if(this.ingredients.length>0){
      this.nav.push(ResultsPage, {ingredients: this.ingredients});
    }
  }
}
