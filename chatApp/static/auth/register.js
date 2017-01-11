(function () {
    'use strict';

    var app = angular.module('register', [
        'ngRoute',
        'auth'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/register/', {
            templateUrl: 'static/auth/view/register.html',
            controller: 'RegisterCtrl'
        });
    }])

    .controller('RegisterCtrl', ['$scope', 'Auth', function ($scope, Auth) {
        $scope.auth = Auth;
    }]);
})();
