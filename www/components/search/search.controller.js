angular.module('college-pantry').controller('SearchController',
  function($scope) {
      console.log('in search controller');

      $scope.next = function () {
        console.log('next');
      }
  }
);
