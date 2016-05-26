import {Page, NavController, NavParams} from 'ionic-angular';
import {DetailsPage} from '../details/details';
import {Food2ForkService} from '../../services/food2forkService';

@Page({
    templateUrl: 'build/pages/results/results.html',
    providers: [Food2ForkService]
})
export class ResultsPage {
  static get parameters() {
    return [[Food2ForkService], [NavController], [NavParams]];
  }

  constructor(food2fork, nav, navParams) {
      this.food2fork = food2fork;
      this.nav = nav;
      this.navParams = navParams;
      this.ingredients = navParams.get('ingredients');

      this.food2fork.findRecipes(this.ingredients).subscribe(
          data => {
              let object = data.json();
              this.foundRecipes = object.recipes;
          },
          err => console.error(err)
      );
  }

  goToDetails(recipe) {
      this.nav.push(DetailsPage, {recipe:recipe});
  }
}
