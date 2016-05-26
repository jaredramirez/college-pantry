import {Page, NavParams, Platform} from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';

@Page({
    templateUrl: 'build/pages/details/details.html'
})
export class DetailsPage {
  static get parameters() {
    return [[NavParams], [Platform]];
  }

  constructor(navParams, platform) {
    this.navParams = navParams;
    this.platform = platform;
    this.recipe = navParams.get('recipe');

    this.platform.ready().then(() => {
        InAppBrowser.open(this.recipe.source_url, '_self', 'location=yes,toolbar=yes,disallowoverscroll=no');
    });
  }
}
