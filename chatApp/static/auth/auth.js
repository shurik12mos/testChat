(function () {
    'use strict';

    var app = angular.module('auth', ['ngCookies']);

    app.factory('Auth', function ($http, $location, $cookies) {
        var auth = {},
            logIn = false;
        
        function handleResponse(username, success, scope) {
			var data;
            if (success.data.status == "true") {				
				data = success.data;
				auth.user.username = data.username;	                
                logIn = true;				
                $location.path('chat/');
            } else {
                makeErrorMessage(scope, success.data.statusText);
            }
        }

        function makeErrorMessage(scope, message) {
            scope.error = {
                error: true,
                message: message
            };
        }

        auth.user = {};

        auth.isLoggedIn = function () {
            return logIn;
        };

        auth.logining = function (username, password, scope) {
            if (!username || !password) return;	
			$http.post('/auth/login/', {
                    username: username,
                    password: password
                })
                .then(function (success, status, header) {							
                    handleResponse(username, success, scope);
                }, function (err) {					
                    var message = err.status + ', ' + err.statusText;
                    makeErrorMessage(scope, message);
                });
        };

        auth.register = function (username, password, email, scope) {
            if (!username || !password) return;
            $http.post('/auth/register/', {
                    username: username,
                    password: password,
                    email: email
                })
                .then(function (success, status, header) {
                    handleResponse(username, success, scope);
                }, function (err) {
                    var message = err.status + ', ' + err.statusText;
                    makeErrorMessage(scope, message);
                    scope.password = "";
                });
        };			

        return auth;
    });
})();
