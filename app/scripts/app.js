(function () {

  var app = angular.module("app", ['ngRoute']);

  app.config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('private', {
          templateUrl: 'private',
          controller: 'WelcomeController'
        }).otherwise({
        templateUrl: 'templates/welcome.html',
        controller: 'WelcomeController'
      });
    }]);


  app.controller('WelcomeController', function ($scope) {

    $scope.message = 'This is Add new order screen';
    console.log("sadasd");

  });


  app.controller('ShowOrdersController', function ($scope) {

    $scope.message = 'This is Show orders screen';

  });
})();
