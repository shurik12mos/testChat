(function () {
    'use strict';

    var app = angular.module('login', [
        'ngRoute',
        'auth'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login/', {
            templateUrl: 'static/auth/view/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope', 'Auth', function ($scope, Auth) {
        $scope.auth = Auth;
    }]);
})();
