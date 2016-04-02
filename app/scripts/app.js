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
        .otherwise({redirectTo: '/'});
    }]);


  app.controller('WelcomeController', function ($scope) {

    $scope.message = 'This is Add new order screen';
    console.log('sadasd');

  });


  app.controller('GameController', function ($scope) {

    $("#DateCountdown").TimeCircles({
      use_top_frame: true,
      animation: "smooth",
      bg_width: 1,
      fg_width: 0.043333333333333335,
      circle_bg_color: "#60686F",
      direction: "Clockwise",
      count_past_zero: false,
      "time": {
        "Days": {
          "text": "Days",
          "color": "#FFCC66",
          "show": false
        },
        "Hours": {
          "text": "Hours",
          "color": "#99CCFF",
          "show": false
        },
        "Minutes": {
          "text": "Minutes",
          "color": "#BBFFBB",
          "show": false
        },
        "Seconds": {
          "text": "Seconds",
          "color": "#26d7ae",
          "show": true
        }
      }
    });

  });
})();
