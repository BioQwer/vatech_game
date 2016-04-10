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

  var tableRussian = {
    WELCOME_MESSAGE: 'Приглашаем Вас принять участие в игре от VATECH',
    GAME_MESSAGE: 'Выберите снимок с наилучшим качеством изображения',
    WIN_MESSAGE: 'Это снимок сделан при помощи EzSensor от VATECH!',
    ACTION_MESSAGE: 'Пожалуйста, заполните форму и получите подарок',
    FAIL_MESSAGE: 'Попробуйте еще раз…',
    CHANGE_LANGUAGE_BUTTON: 'English'
  };

  var tableEnglish = {
    WELCOME_MESSAGE: 'Welcome To Vatech Game Zone',
    GAME_MESSAGE: 'Select The Best Intra-Oral Image Out Of These Six',
    WIN_MESSAGE: 'That\'s The VATECH EzSensor Image!',
    ACTION_MESSAGE: 'Please Fill The Form And Collect Your Gift',
    FAIL_MESSAGE: 'You have 1 more chance…',
    CHANGE_LANGUAGE_BUTTON: 'Русский язык'
  };

  var app = angular.module('app', ['ngRoute', 'ng', 'ngAnimate', 'ngAudio', 'pascalprecht.translate']);

  app.run(['$rootScope', '$location', '$templateCache', function ($rootScope, $location, $templateCache) {

    $location.path('/');
    $templateCache.put('templates/welcome.html');
    $templateCache.put('templates/game.html');
    $templateCache.put('templates/fail.html');
    $templateCache.put('templates/win.html');
    $rootScope.appInitialized = true;
  }]);

  app.config(['$routeProvider', '$translateProvider', function ($routeProvider, $translateProvider) {

    $translateProvider.translations('ru', tableRussian);
    $translateProvider.translations('en', tableEnglish);
    $translateProvider.preferredLanguage('ru');

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

  app.controller('FailController', ['$scope', '$window', 'ngAudio', function ($scope, $window, ngAudio) {

    $scope.redirect = function () {
      $window.location.href = '#/game';
    };

    console.log($scope);
    currentSound = ngAudio.play("audio/fail.mp3"); // returns NgAudioObject
    currentSound.volume = globalVolume;

    $scope.$on("$destroy", function () {
      currentSound.stop();
    });
  }]);

  app.controller('WinController',
    ['$scope', 'ngAudio', '$window', function ($scope, ngAudio, $window) {

      $('#winImage').attr('src', winImage);
      console.log($scope);

      $scope.redirect = function () {
        $window.location.href = '#/game';
      };

      currentSound = ngAudio.play("audio/win.mp3"); // returns NgAudioObject
      currentSound.volume = globalVolume;

      $scope.$on("$destroy", function () {
        currentSound.stop();
      });
    }]);

  app.controller('WelcomeController', ['$scope', 'ngAudio', function ($scope, ngAudio) {
    $scope.sound = ngAudio.play("audio/welcome.mp3"); // returns NgAudioObject
    $scope.sound.volume = globalVolume;

    currentSound = $scope.sound;

    $scope.$on("$destroy", function () {
      currentSound.stop();
    });
  }]);

  app.controller('GeneralController', ['$translate', function ($translate) {

    this.checkState = function () {
      if (globalVolume > 0) {
        this.changeTo = 'Mute'
      } else {
        this.changeTo = 'Unmute'
      }
    };

    this.checkState();

    this.changeMute = function () {
      if (globalVolume > 0) {
        globalVolume = 0;
        currentSound.volume = globalVolume;
      } else {
        globalVolume = 1;
        currentSound.volume = globalVolume;
      }
      this.checkState();
    };

    var _isRussian = true;
    this.changeLanguage = function () {
      if(_isRussian) {
        $translate.use('en');
        _isRussian = false;
      }
      else {
        $translate.use('ru');
        _isRussian = true;
      }
    }
  }]);

  app.controller('GameController',
    ['$scope', '$window', 'ngAudio', function ($scope, $window, ngAudio) {

      currentSound = ngAudio.play("audio/waiting.mp3"); // returns NgAudioObject
      currentSound.volume = globalVolume;

      var width = $("#timerkeeper").width();

      var countdown = $("#countdown")
        .countdown360({
          radius: width / 2.5,
          seconds: 10,
          label: ['sec', 'secs'],
          strokeStyle: "#26d7ae",
          fontColor: 'white',
          fillStyle: 'black',
          fontWeight: 100,
          onComplete: function () {
            $window.location.href = '#/fail';
            console.log('timer done');
            setTimeout(function () {
              countdown.addSeconds(100000000);
            }, 500);
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
            setTimeout(function () {
              countdown.addSeconds(100000000);
            }, 500);
          })
        } else {
          imageOnPage.click(function () {
            $window.location.href = '#/fail';
            setTimeout(function () {
              countdown.addSeconds(100000000);
            }, 500);
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
    }]);
})();
