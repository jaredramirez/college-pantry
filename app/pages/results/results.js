import {Page, Platform, NavParams, NavController, Loading, Alert, Toast} from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';
import {Food2ForkService} from '../../services/food2forkService';

@Page({
    templateUrl: 'build/pages/results/results.html',
    providers: [Food2ForkService]
})
export class ResultsPage {
  static get parameters() {
    return [[Platform], [NavParams], [NavController], [Food2ForkService]];
  }

  constructor(platform, navParams, nav, food2fork) {
      this.platform = platform;
      this.ingredients = navParams.get('ingredients');
      this.nav = nav;
      this.food2fork = food2fork;
      this.recipes = [];
      this.page = 1;

      let loading = Loading.create({
        spinner: 'bubbles',
        content: 'Loading...'
      });
      this.nav.present(loading);

      this.food2fork.findRecipes(this.ingredients, this.page).subscribe(
          data => {
            loading.dismiss();
            this.recipes  = data.json().recipes;
          },
          error => {
            loading.dismiss();
            let toast = Toast.create({
              message: 'Something went wrong!',
              duration: 3000
            });
            this.nav.pop();
            this.nav.present(toast);
          },
          () => loading.dismiss()
      );
  }

  goToDetails(recipe) {
    this.platform.ready().then(() => {
      InAppBrowser.open(recipe.source_url, '_blank',
        'location=yes,hardwareback=no,mediaPlaybackRequiresUserAction=yes,toolbarposition=top'
      );
    });
  }

  doInfinite(infiniteScroll){
    this.food2fork.findRecipes(this.ingredients, this.page++).subscribe(
        data => {
            let recipes = data.json().recipes;
            this.recipes = this.recipes.concat(recipes);
            infiniteScroll.complete();
        },
        error => {
          infiniteScroll.complete();
          let toast = Toast.create({
            message: 'Something went wrong!',
            duration: 3000
          });
          this.nav.present(toast);
        },
        () => infiniteScroll.complete()
    );
  }
}
