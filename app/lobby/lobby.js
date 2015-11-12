"use strict";

angular.module("LobbyApp", [])
    .config(["$routeProvider", function($routeProvider) {
        $routeProvider
            .when("/lobby", {
                templateUrl: "lobby/lobby.html",
                controller: "LobbyCtrl"
            })
    }])
    .factory("Lobby", function($q, $timeout, $http, LobbyMock) {
        return {
            findMatch: function() {
                var p = $q.defer();

                $http.get("game/start.php", {})
                    .success(function(response) {
                        p.resolve(response);
                    })
                    .error(function() {
                        p.reject(false);
                    })

                return p.promise;
            }
        }
    })
    .factory("LobbyMock", function($q, $timeout) {
        return {
            findMatch: function() {
                var p = $q.defer();

                $timeout(function() {
                    p.resolve({
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
                    });
                }, 1000);

                return p.promise;
            }
        }
    })
    .controller("LobbyCtrl", ["$scope", "$location", "Lobby", "Match", "User", function($scope, $location, Lobby, Match, User) {

        $scope.form = {
            isSearching: false
        }

        //finds a match
        $scope.play = function() {
            $scope.form.isSearching = true;

            Lobby.findMatch().then(function(playerNum) {
                //load match object
                //Match.game = game;

                //hardcode
                Match.game = {
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

                //ser user service playerNum to response
                User.playerNum = playerNum;

                console.log(User.playerNum);

                //go to match
                $location.url("/match");

            })
        }
    }])
