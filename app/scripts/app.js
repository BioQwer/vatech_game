var app = angular.module("app");

app.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/private', {
      templateUrl: 'templates/welcome.html',
      controller: 'AddOrderController'
    }).otherwise({
      redirectTo: '/AddNewOrder'
    });
  }]);


app.controller('AddOrderController', function ($scope) {

  $scope.message = 'This is Add new order screen';

});


app.controller('ShowOrdersController', function ($scope) {

  $scope.message = 'This is Show orders screen';

});
