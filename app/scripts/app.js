/* global angular */
'use strict';

$("#countdown").click(function () {
  countdown.extendTimer(2);
});

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
        .otherwise({redirectTo: '/'});
    }]);


  app.controller('WelcomeController', function ($scope) {

    $scope.message = 'This is Add new order screen';
    console.log('sadasd');

  });


  app.controller('GameController',
    ['$scope','$window', function ($scope,$window) {

      var width = $(".col-md-4").width();
        console.log(width)

      var countdown = $("#countdown").countdown360({
        radius: width/2.5,
        seconds: 15,
        label: ['sec', 'secs'],
        strokeStyle: "#26d7ae",
        fontColor: 'white',
        fillStyle: 'black',
        fontWeight: 100,
        onComplete: function () {
          console.log('done');
          $window.location.href = '/';
        }
      });

      countdown.start();

    }]);
})();
