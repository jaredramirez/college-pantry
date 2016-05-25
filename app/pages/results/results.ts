import {Page, NavController, NavParams} from 'ionic-angular';
import {DetailsPage} from '../details/details';
import {Food2ForkService} from '../../services/food2fork';

@Page({
    templateUrl: 'build/pages/results/results.html',
    providers: [Food2ForkService]
})
export class ResultsPage {
    public foundRecipes;
    public ingredients;

    constructor(private food2fork: Food2ForkService, private nav: NavController, private navParams: NavParams) {
        this.ingredients = navParams.get('ingredients');

        this.food2fork.findRecipes(this.ingredients).subscribe(
            data => {
                let object = data.json();
                this.foundRecipes = object.recipes;
            },
            err => console.error(err),
            () => null
        );
    }

    goToDetails(recipe) {
        this.nav.push(DetailsPage, {recipe:recipe});
    }
}
