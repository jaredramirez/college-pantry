import {Page, NavController, NavParams} from 'ionic-angular';
import {DetailsPage} from '../details/details';
import {GitHubService} from '../../services/github';

@Page({
    templateUrl: 'build/pages/results/results.html',
    providers: [GitHubService]
})
export class ResultsPage {
    public foundRepos;
    public username;

    constructor(private github: GitHubService, private nav: NavController, private navParams: NavParams) {
        this.username = navParams.get('username');
        this.github.getRepos(this.username).subscribe(
            data => {
                this.foundRepos = data.json();
            },
            err => console.error(err),
            () => console.log('getRepos completed')
        );
    }

    goToDetails(repo) {
        this.nav.push(DetailsPage, {repo:repo});
    }
}
