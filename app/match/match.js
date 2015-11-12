'use strict';

angular.module("MatchApp", [])
.config(["$routeProvider", function($routeProvider){
	$routeProvider
		.when("/match", {
			templateUrl: "match/match.html",
			controller: "MatchCtrl"
		})
}])
.service("Match", function(){
	this.game = {
		gameID: 747,
		player0: {
			profileId: 511,
			name: "Sal", 
			currentHealth: 100
		},
		player1: {
			profileId: 901,
			name: "Phreak",
			currentHealth: 100
		}
	};
})
.controller("MatchCtrl", ['$scope', '$interval', 'User', 'Match', function($scope, $interval, User, Match){
	$scope.game = Match.game;

	$interval(function(){
		$scope.game.player1.currentHealth = ($scope.game.player1.currentHealth > 0) ? $scope.game.player1.currentHealth-1 : 120;
	}, 100);

	$scope.dims = {
		height: '100%',
		width: '100%'
	}

	//on ready get page dimensions
	// angular.element(document).ready(function(){
	// 	$scope.dims.height = $(document).height();
	// 	console.log($scope.dims);
	// })

	$scope.$watch(function(){
		return window.innerHeight;
	}, function(val){
		$scope.dims.height = val;
	})

	//socket stuff
	var sourceUrl = 'http://52.32.183.170:3000/game?player=' + User.playerNum;
	var player0 = new EventSource(sourceUrl);
 	player0.onmessage = function(event) {
    	console.log(event.data);
  	};
}])