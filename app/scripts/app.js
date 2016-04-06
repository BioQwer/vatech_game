/* global angular */
'use strict';

(function () {

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

  var winImage, globalVolume = 1, currentSound;

  function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }

  function compareRandom(a, b) {
    return Math.random() - 0.5;
  }

  var app = angular.module('app', ['ngRoute', 'ng', 'ngAnimate', 'ngAudio']);

  app.run(function ($rootScope, $location, $templateCache) {

    $location.path('/');
    $templateCache.put('welcome.html', 'This is the content of the template');
    $templateCache.put('game.html', 'This is the content of the template');
    $templateCache.put('fail.html', 'This is the content of the template');
    $templateCache.put('win.html', 'This is the content of the template');
    $rootScope.appInitialized = true;
  });

  app.config(['$routeProvider',
    function ($routeProvider) {

      $routeProvider
        .when('/game', {
          templateUrl: 'templates/game.html',
          controller: 'GameController'
        })
        .when('/win', {
          templateUrl: 'templates/win.html',
          controller: 'WinController'
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

  app.controller('FailController', function ($scope, $window, ngAudio) {

    $scope.redirect = function () {
      $window.location.href = '#/game';
    };

    console.log($scope);
    currentSound = ngAudio.play("../audio/fail.mp3"); // returns NgAudioObject
    currentSound.volume = globalVolume;

    $scope.$on("$destroy", function () {
      currentSound.stop();
    });
  });

  app.controller('WinController',
    function ($scope, ngAudio, $window) {

      $('#winImage').attr('src', winImage);
      console.log($scope);

      $scope.redirect = function () {
        $window.location.href = '#/game';
      };

      currentSound = ngAudio.play("../audio/win.mp3"); // returns NgAudioObject
      currentSound.volume = globalVolume;

      $scope.$on("$destroy", function () {
        currentSound.stop();
      });
    });

  app.controller('WelcomeController', function ($scope, ngAudio) {
    $scope.sound = ngAudio.play("../audio/welcome.mp3"); // returns NgAudioObject
    $scope.sound.volume = globalVolume;

    currentSound = $scope.sound;

    $scope.$on("$destroy", function () {
      currentSound.stop();
    });
  });

  app.controller('SoundController', function () {
    this.changeMute = function () {
      if (globalVolume > 0) {
        globalVolume = 0;
        currentSound.volume = globalVolume;
      } else {
        globalVolume = 1;
        currentSound.volume = globalVolume;
      }
    }
  });

  app.controller('GameController',
    function ($scope, $window, ngAudio) {

      currentSound = ngAudio.play("../audio/waiting.mp3"); // returns NgAudioObject
      currentSound.volume = globalVolume;

      var width = $("#timerkeeper").width();

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

      pictures.sort(compareRandom);

      var folder = randomInteger(1, 3);
      imagesIds.forEach(function (item, i) {
        var path = 'images/' + folder + '/' + pictures[i];

        var imageOnPage = $('#' + item);
        imageOnPage.attr('src', path);

        if (path.match('.*win.*')) {
          console.log('win  = ' + path);
          imageOnPage.click(function () {
            winImage = path;
            $window.location.href = '#/win';
            countdown.addSeconds(100000000);
          })
        } else {
          imageOnPage.click(function () {
            $window.location.href = '#/fail';
            countdown.addSeconds(100000000);
          })
        }
        console.log(item);
        console.log(path);
      });

      countdown.start();
      console.log('timer start');

      $scope.$on("$destroy", function () {
        currentSound.stop();
      });
    });
})();
