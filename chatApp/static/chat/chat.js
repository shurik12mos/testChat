(function () {
    'use strict';

    var app = angular.module('chat', [
        'ngRoute',
        'auth',
		'chatService'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/chat/', {
            templateUrl: 'static/chat/view/chat.html',
            controller: 'ChatCtrl'
        });
    }])

    .controller('ChatCtrl', ['$scope', '$location', 'Auth', 'Chat', function ($scope, $location, Auth, Chat) {
        $scope.auth = Auth;
		if (!Auth.isLoggedIn()) $location.path('login/');
		$scope.chat = Chat;
    }]);
})();
