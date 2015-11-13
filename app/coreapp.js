'use strict';

angular.module('CoreApp', [
	'ngRoute',
	"ngAnimate",
	'SampleApp',
	"HomeApp",
	"LoginApp",
	"LobbyApp",
	"MatchApp",
	"ui.bootstrap"
])
.run(['$log', '$http', '$rootScope', '$location', 'User', function($log, $http, $rootScope, $location, User){
	//check local
	if(localStorage.user){
		User.user = JSON.parse(localStorage.user);
		$location.url('/lobby');
	}
}])

.config(['$routeProvider', '$logProvider', function($routeProvider, $logProvider){
	$logProvider.debugEnabled(true);
	//$routeProvider.otherwise({redirectTo: '/eventtracker'})
}])
.service("User", function(){
	this.user = {};
})
.factory('localStorage', ['$rootScope', function ($rootScope) {

    var service = {

        model: {
            name: '',
            email: ''
        },

        SaveState: function () {
            sessionStorage.userService = angular.toJson(service.model);
        },

        RestoreState: function () {
            service.model = angular.fromJson(sessionStorage.userService);
        }
    }

    $rootScope.$on("savestate", service.SaveState);
    $rootScope.$on("restorestate", service.RestoreState);

    return service;
}])

//Father Controller
.controller('MainCtrl', ['$scope', '$http', '$log', function($scope, $http, $log){

}])