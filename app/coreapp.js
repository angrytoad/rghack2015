'use strict';

angular.module('CoreApp', [
	'ngRoute',
	"ngAnimate",
	'SampleApp',
	"HomeApp",
	"LoginApp",
	"LobbyApp",
	"MatchApp"
])
.run(['$log', '$http', '$rootScope', function($log, $http, $rootScope){
	
}])

.config(['$routeProvider', '$logProvider', function($routeProvider, $logProvider){
	$logProvider.debugEnabled(true);
	//$routeProvider.otherwise({redirectTo: '/eventtracker'})
}])

//Father Controller
.controller('MainCtrl', ['$scope', '$http', '$log', function($scope, $http, $log){

}])