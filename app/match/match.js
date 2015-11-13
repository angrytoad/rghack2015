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
.controller("MatchCtrl", ['$scope', '$interval', '$log', '$q', 'User', 'Match', 'ActionLog', function($scope, $interval, $log, $q, User, Match, ActionLog){
	$scope.game = Match.game;
	$scope.game.whosTurn = 0;
	$scope.game.cardPlaced = false;
	$scope.game.playerNum = User.playerNum;
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

    	//TURNS
    	if(e.type == "turn"){
    		$scope.game.whosTurn = (e.data % 2 == User.playerNum) ? ($scope.game.cardPlaced = false, User.playerNum) : 1 - User.playerNum;
    	}

    	if(e.type == "hand"){
    		$scope.game.player0.draw = e.data;
    	}

    	if(e.type == "player"){
    		$scope.game.player0.onField = e.data;
    	}

    	if(e.type == "enemy"){
    		$scope.game.player1.onField = e.data;
    	}

    	//WHEN DRAWING
   //  	if(e.type == "draw"){

			// try { $scope.game.player0.draw.push(e.data); 
			// } catch(e) {
			// 	$scope.game.player0.draw = [];
			// 	$scope.game.player0.draw.push(e.data);

			// 	$log.error("Try catch player0");
			// 	$log.debug($scope.game.player0);
			// }

			// $log.info("Player0 Object");
   //  		$log.debug($scope.game.player0);

			// $scope.$digest();
   //  	}

    	//ENEMY HAND
    	if(e.type == "enemyPlace"){

    	}


  	};

  	$scope.submitAction = function(action){
  		var p = $q.defer();

  		ActionLog.sendAction(User.playerNum, action).then(function(response){
  			$log.info("ActionLog.sendAction: Response -");
  			$log.debug(action);
  			$log.debug(response);

  			p.resolve(true);
  		})

  		return p.promise;
  	}

  	$scope.endTurn = function(){

  		$scope.submitAction({type: "endturn"});
  	}

  	$scope.performAttack = function(card, type){
  		$scope.game.pendingAttack = true;

  		$log.info("performAttack: Champion: " + card.champion + ", type: " + type);

  		//listen for who we are going to attack
  		$scope.$on("attack", function(e, enemyCard){
  			// if(type == 'basic'){
  			// 	enemyCard.health - 1;
  			// }
  			// if(type == 'special')
  			// 	enemyCard.health - card.damage;

  			//log resulting status
  			$log.info("performAttack: Enemy Champion: " + enemyCard.champion + ", health: " + enemyCard.health);

  			$scope.submitAction({type: "attack", card: card.id, target: enemyCard.id});
  		})

  	}

  	$scope.targetEnemy = function(card){
  		if($scope.game.pendingAttack){
  			$log.info("targetEnemy: Enemy Champion " + card.champion);
  			$scope.$broadcast("attack", card);
  		}
  	}

  	$scope.placeCard = function(card){
  		// //remove from draw
  		// $scope.game.player0.draw.splice($scope.game.player0.draw.indexOf(card), 1);
  		// //push to field
  		// $scope.game.player0.onField.push(card);

  		$log.info("placeCard");
  		$log.debug(card);

  		//send action
  		if($scope.game.cardPlaced == false){
	  		$scope.submitAction({type: "place", hand: card.id}).then(function(){
	  			$scope.game.cardPlaced = true;
	  		})
  		}
  	}
}])