'use strict';

angular.module("HomeApp", [])
.config(["$routeProvider", function($routeProvider){
	$routeProvider
		.when("/", {
			templateUrl: "home/home.html",
			controller: "HomeCtrl"
		})
}])
.controller("HomeCtrl", ['$scope', function($scope){
	
}])