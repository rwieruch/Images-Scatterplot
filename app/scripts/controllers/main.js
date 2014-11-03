'use strict';

/**
 * @ngdoc function
 * @name d3OnAngularSeedApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the d3OnAngularSeedApp
 */
angular.module('d3OnAngularSeedApp')
  .controller('MainCtrl', function ($scope) {
    $scope.data = [
      {id: 1, results: 33, behavior: 77, img: 'circle6.png', name: 'Lori', status: 'developer', info: 'lorem ipsum' },
      {id: 2, results: 76, behavior: 44, img: 'circle6.png', name: 'Gari', status: 'marketing', info: 'lorem ipsum' },
      {id: 3, results: 43, behavior: 87, img: 'google110.png', name: 'Juri', status: 'marketing', info: 'lorem ipsum' },
      {id: 4, results: 87, behavior: 45, img: 'circle6.png', name: 'Huzi', status: 'ceo', info: 'lorem ipsum' },
      {id: 5, results: 98, behavior: 55, img: 'google110.png', name: 'Kani', status: 'developer', info: 'lorem ipsum' },
      {id: 6, results: 44, behavior: 55, img: 'google110.png', name: 'Tiri', status: 'developer', info: 'lorem ipsum' },
      {id: 7, results: 55, behavior: 65, img: 'twitter4.png', name: 'Riri', status: 'marketing', info: 'lorem ipsum' },
      {id: 8, results: 0, behavior: 0, img: 'google110.png', name: 'Riri', status: 'marketing', info: 'lorem ipsum' },
      {id: 9, results: 100, behavior: 100, img: 'twitter4.png', name: 'Riri', status: 'marketing', info: 'lorem ipsum' }
    ];
  });
