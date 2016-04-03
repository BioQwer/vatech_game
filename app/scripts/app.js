/* global angular */
'use strict';

var pictures = [
  'picture1.jpg',
  'picture2.jpg',
  'picture3.jpg',
  'picture4.jpg',
  'win.jpg',
  'win2.jpg'
];

var imagesIds = [
  'img-1',
  'img-2',
  'img-3',
  'img-4',
  'img-5',
  'img-6'
];

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

function compareRandom(a, b) {
  return Math.random() - 0.5;
}

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

      var width = $("#timerkeeper").width();

      pictures.sort(compareRandom);

      var folder = randomInteger(1, 3);
      imagesIds.forEach(function (item, i) {
        var path = 'images/' + folder + '/' + pictures[i];

        var imageOnPage = $('#' + item);
        imageOnPage.attr('src', path);

        if (path.match('.*win.*')) {
          console.log('win  = ' + path)
          imageOnPage.click(function () {
          })
        } else {
          imageOnPage.click(function () {
            $window.location.href = '#/fail';
          })
        }
        console.log(item);
        console.log(path);
      });

      var countdown = $("#countdown")
        .countdown360({
          radius: width / 2.5,
          seconds: 15,
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
