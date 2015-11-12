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
		playerOne: {
			profileId: 511,
			name: "Sal", 
			currentHealth: 100
		},
		playerTwo: {
			profileId: 400,
			name: "Phreak"
		}
	};
})
.controller("MatchCtrl", ['$scope', '$interval', 'Match', function($scope, $interval, Match){
	$scope.game = Match.game;

	$interval(function(){
		$scope.game.playerOne.currentHealth = ($scope.game.playerOne.currentHealth > 0) ? $scope.game.playerOne.currentHealth-1 : 120;
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
	var player0 = new EventSource('http://52.32.183.170:3000/game?player=0');
 	player0.onmessage = function(event) {
    	console.log(event.data);
  	};
}])