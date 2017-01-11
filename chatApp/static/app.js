(function () {
    'use strict';

    var app = angular.module('test', [
            'ngRoute',
			'ngCookies',
            'auth',
			'login',
			'register',
			'chat'
        ])
        .config(['$locationProvider', '$routeProvider', '$httpProvider', 
            function ($locationProvider, $routeProvider, $httpProvider) {
               $locationProvider.hashPrefix('!');
			   
                $routeProvider.otherwise({
                    redirectTo: 'login/'
                });
				
				$httpProvider.defaults.xsrfCookieName = 'csrftoken';
				$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';				
            }
        ])
		.run(function ($rootScope, Auth, $location) {
			if (!Auth.isLoggedIn()) $location.path('login/');		  
		});
        
})();
