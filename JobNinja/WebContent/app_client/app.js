var app = angular.module('ninja', ['ngRoute'])
    .config(function($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl : '/JobNinja/public/views/templates/home.view.html'
            })
            .when('/login',{
                templateUrl : '/JobNinja/public/views/templates/login.view.html',
                controller : 'loginController'
            })
            .when('/logout',{
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
            .when('/company/:id?',{
            	templateUrl : '/JobNinja/public/views/templates/company.view.html',
            	controller : 'companyController'
            })
            .otherwise({
                redirectTo : '/'
            });
    });
