"use strict";

angular.module("LobbyApp", [])
.config(["$routeProvider", function($routeProvider){
	$routeProvider
		.when("/lobby", {
			templateUrl: "lobby/lobby.html",
			controller: "LobbyCtrl"
		})
}])
.factory("Lobby", function($q, $timeout, $http, LobbyMock){
	//when testing
	return LobbyMock;
})
.factory("LobbyMock", function($q, $timeout){
	return {
		findMatch: function(){
			var p = $q.defer();

			$timeout(function(){
				p.resolve({
					gameID: 747
				});
			}, 1000);

			return p.promise;
		}
	}
})
.controller("LobbyCtrl", ["$scope", "Lobby",  function($scope, Lobby){

	$scope.form = {
		isSearching: false
	}

	//finds a match
	$scope.play = function(){

		Lobby.findMatch().then(function(){

		})
	}
}])