/* global angular */
'use strict';

(function () {

  var app = angular.module('app', ['ngRoute', 'ng']);


  app.config(['$routeProvider',
    function ($routeProvider) {

      $routeProvider
        .when('/game', {
          templateUrl: 'templates/game.html',
          controller: 'GameController'
        })
        .when('/', {
          templateUrl: 'templates/welcome.html',
          controller: 'WelcomeController'
        })
        .when('/fail', {
          templateUrl: 'templates/fail.html',
          controller: 'FailController'
        })
        .otherwise({redirectTo: '/'});
    }]);

  app.controller('FailController',
    ['$scope', '$window', function ($scope, $window) {

      $scope.redirect = function () {
        $window.location.href = '#/game';
      };


    }]);

  app.controller('WelcomeController', function ($scope) {
    console.log('WelcomeController Enter point');
  });
  
  app.controller('GameController',
    ['$scope', '$window', function ($scope, $window) {

      var width = $(".col-md-4").width();

      var countdown = $("#countdown")
        .countdown360({
          radius: width / 2.5,
          seconds: 3,
          label: ['sec', 'secs'],
          strokeStyle: "#26d7ae",
          fontColor: 'white',
          fillStyle: 'black',
          fontWeight: 100,
          onComplete: function () {
            $window.location.href = '#/fail';
            console.log('timer done');
            countdown.addSeconds(100000000);
          }
        });

      countdown.start();
      console.log('timer start');
    }]);
})();
