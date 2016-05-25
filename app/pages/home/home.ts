import {Page, NavController} from 'ionic-angular';
import {ResultsPage} from '../results/results';

@Page({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    public foundRepos;
    public username;
    private ingredients;

    constructor(private nav: NavController) {
      this.ingredients = [{ingredient: ''}];
    }

    addNewIngredient() {
      this.ingredients.push({ingredient: ''});
    }

    goToResults() {
      if(this.ingredients.length>0){
        this.nav.push(ResultsPage, {ingredients: this.ingredients});
      }
    }
}
