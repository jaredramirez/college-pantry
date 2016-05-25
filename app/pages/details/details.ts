import {Page, NavParams} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/details/details.html'
})
export class DetailsPage {
    public recipe;

    constructor(private navParams: NavParams) {

        this.recipe = navParams.get('recipe');
    }
}
