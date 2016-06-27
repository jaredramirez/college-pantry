angular.module('college-pantry').controller('SearchController',
  function($scope, $state) {
    $scope.ingredients = [
      'a', 'b'
    ];
    $scope.addIngredient = function () {
      console.log('add ingredient');
    }
  }
);
