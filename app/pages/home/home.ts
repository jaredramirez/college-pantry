import {Page, NavController} from 'ionic-angular';
import {ResultsPage} from '../results/results';
import {GitHubService} from '../../services/github';

@Page({
    templateUrl: 'build/pages/home/home.html',
    providers: [GitHubService]
})
export class HomePage {
    public foundRepos;
    public username;

    constructor(private github: GitHubService, private nav: NavController) {
    }

    goToResults() {
        this.nav.push(ResultsPage, {username: this.username});
    }
}
