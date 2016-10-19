var app = angular.module('App', ['ngRoute'])

    app.config(['$routeProvider', function($routeProvider) {

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

    }])

    app.controller('loginController', function() {
        
    })
    
    
    app.controller('SignUpCtrl', function() {
        
    })
