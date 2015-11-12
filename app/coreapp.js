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
.run(['$log', '$http', '$rootScope', function($log, $http, $rootScope){
	
}])

.config(['$routeProvider', '$logProvider', function($routeProvider, $logProvider){
	$logProvider.debugEnabled(true);
	//$routeProvider.otherwise({redirectTo: '/eventtracker'})
}])
.service("User", function(){
	this.user = {};
	this.playerNum = null;
})

//Father Controller
.controller('MainCtrl', ['$scope', '$http', '$log', function($scope, $http, $log){

}])