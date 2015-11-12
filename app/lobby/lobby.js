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
.controller("LobbyCtrl", ["$scope", "$location", "Lobby", "Match",  function($scope, $location, Lobby, Match){

	$scope.form = {
		isSearching: false
	}

	//finds a match
	$scope.play = function(){
		$scope.form.isSearching = true;

		Lobby.findMatch().then(function(game){
			//load match object
			Match.game = game;
			//go to match
			$location.url("/match");

		})
	}
}])