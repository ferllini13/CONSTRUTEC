var app = angular.module('App', ['ngRoute'])

    app.config(['$routeProvider', function($routeProvider, $urlRouterProvider) {

        $routeProvider
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'loginController'
            })
            .when('/builds', {
                templateUrl: 'views/builds.html',
                controller: 'buildsController'
            })
            .when('/admin', {
                templateUrl: 'views/admin.html',
                controller: 'adminController'
            })
            .when('/signUp', {
                controller: 'SignUpCtrl',
                templateUrl:'templates/signUp.html'
            })
             .otherwise({
                redirectTo: '/login'
            });
            //$urlRouterProvider.otherwise('/login');

    }])

    app.controller('loginController', function() {
        
    })
    
    
    app.controller('SignUpCtrl', function() {
        
    })

    
    
App.directive('menu', function() {
  return {
     templateUrl: 'templates/menu.html',
      controller:"MenuCtrl"
  };});
