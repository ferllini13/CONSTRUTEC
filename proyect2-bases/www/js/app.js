var app = angular.module('App', ['ngRoute'])

    app.config(['$routeProvider', function($routeProvider, $urlRouterProvider) {

        $routeProvider
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'loginController'
            })
            .when('/home', {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            })
            
            .when('/signUp', {
                controller: 'SignUpCtrl',
                templateUrl:'templates/signUp.html'
            })
        
            .when('/about',{
                controller: 'AboutCtrl',
                templateUrl:'templates/about.html'
                })
            .when('/materials',{
                controller: 'MaterialsCtrl',
                templateUrl:'templates/materials.html'
                })
            
             .otherwise({
                redirectTo: '/login'
            });

    }])

    app.controller('loginController', function() {
        
    })
    
    
    app.controller('SignUpCtrl', function() {
        
    })

    
    
app.directive('menu', function() {
  return {
     templateUrl: 'templates/menu.html',
      controller:"MenuCtrl"
  };});
/* 	margin: -150px 0 0 -150px;
	width:300px;
	height:300px; */