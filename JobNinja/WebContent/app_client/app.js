var app = angular.module('ninja', ['ngRoute'])
    .config(function($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl : '/JobNinja/public/views/templates/home.view.html',
                controller : 'homeController'
            })
            .when('/login',{
                templateUrl : '/JobNinja/public/views/templates/login.view.html',
                controller : 'loginController'
            })
            .when('/register',{
                templateUrl : '/JobNinja/public/views/templates/register.view.html',
                controller : 'registrationController'
            })
            .when('/profile',{
                templateUrl : '/JobNinja/public/views/templates/profile.view.html',
                controller : 'profileController'
            })
            .when('/test',{
                templateUrl : '/JobNinja/public/views/templates/test.view.html',
                controller : 'testController'
            })
    });
