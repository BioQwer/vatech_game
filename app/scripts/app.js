/* global angular */
'use strict';
(function () {

  var app = angular.module('app', ['ngRoute', 'ng']);


  app.config(['$routeProvider',
    function ($routeProvider) {

      $routeProvider
        .when('/game', {
          templateUrl: 'templates/game.html',
          controller: 'WelcomeController'
        })
        .when('/', {
          templateUrl: 'templates/welcome.html',
          controller: 'WelcomeController'
        })
        .otherwise({redirectTo: '/'});
    }]);


  app.controller('WelcomeController', function ($scope) {

    $scope.message = 'This is Add new order screen';
    console.log('sadasd');

  });


  app.controller('ShowOrdersController', function ($scope) {

    $scope.message = 'This is Show orders screen';

  });
})();
