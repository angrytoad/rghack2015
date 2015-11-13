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
		whosTurn: 0,
		player0: {
			profileId: 511,
			name: "Sal", 
			currentHealth: 100,
			draw: []
		},
		player1: {
			profileId: 901,
			name: "Phreak",
			currentHealth: 100,
			draw: []
		}
	};
})
.factory("ActionLog", function($http, $q, $log){
	return {
		sendAction: function(player, action){
			var p = $q.defer();

			$http({
				method: "POST",
				url: "http://52.32.183.170:3000/action",
				data: $.param({
					player: player,
					action: JSON.stringify(action)
				}),
				headers: {
					"Content-Type":"application/x-www-form-urlencoded"
				}
			})
			.success(function(result){
				p.resolve(result);
			})
			.error(function(){
				p.reject(false);
			})

			return p.promise;
		}
	}
})
.controller("MatchCtrl", ['$scope', '$interval', '$log', 'User', 'Match', 'ActionLog', function($scope, $interval, $log, User, Match, ActionLog){
	$scope.game = Match.game;
	console.log($scope.game);

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
	
	//WATCH HEIGHT
	$scope.$watch(function(){
		return window.innerHeight;
	}, function(val){
		$scope.dims.height = val;
	})

	//WATCH WIDTH
	$scope.$watch(function(){
		return window.innerWidth;
	}, function(){
		$scope.dims.width = $('#board').height();
		$log.info("dimensions");
		$log.debug($scope.dims);

	})

	//socket stuff
	var sourceUrl = 'http://52.32.183.170:3000/game?player=' + User.playerNum; 
	console.log(sourceUrl);
	var player = new EventSource(sourceUrl);
 	$scope.game.player0.draw = [];
 	$scope.game.player0.onField = [];

 	player.onmessage = function(event) {
    	//console.log(event.data);
    	var e = {};
    	$.extend(true, e, JSON.parse(event.data));

    	console.log(e);
    	//WHEN DRAWING
    	if(e.type == "draw"){

			try { $scope.game.player0.draw.push(e.data); 
			} catch(e) {
				$scope.game.player0.draw = [];
				$scope.game.player0.draw.push(e.data);

				$log.error("Try catch player0");
				$log.debug($scope.game.player0);
			}

			$log.info("Player0 Object");
    		$log.debug($scope.game.player0);

			$scope.$digest();
    	}
  	};

  	$scope.submitAction = function(action){

  		ActionLog.sendAction(User.playerNum, action).then(function(response){
  			$log.info("ActionLog.sendAction: Response"); 
  			$log.debug(response);
  		})
  	}

  	$scope.placeCard = function(card){
  		//remove from draw
  		$scope.game.player0.draw.splice($scope.game.player0.draw.indexOf(card), 1);
  		//push to field
  		$scope.game.player0.onField.push(card);

  		//send action
  		$scope.submitAction({type: "place", hand: card.id});
  	}
}])