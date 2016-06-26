angular.module('college-pantry').config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('search', {
                url: '/search',
                templateUrl: 'components/search/search.html',
                controller: 'SearchController'
            })
            .state('results', {
                url: '/results',
                templateUrl: 'components/results/results.html'/*,
                controller: 'ResultsController'*/
            });
        $urlRouterProvider.otherwise('/search');
    });
