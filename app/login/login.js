'use strict';

angular.module("LoginApp", [])
.config(["$routeProvider", function($routeProvider){
	$routeProvider
		.when("/login", {
			templateUrl: "login/login.html",
			controller: "LoginCtrl"
		})
}])
.factory("Login", function($q, $timeout, LoginMock){
	//when testing
	return LoginMock
})
.factory("LoginMock", function($q, $timeout){
	return {
		getRunepageKey: function(name){
			var p = $q.defer();

			//WHEN 200
			$timeout(function(){
				p.resolve("WXYZ");
			}, 500);

			//WHEN 400
			// $timeout(function(){
			// 	p.reject(false);
			// })

			return p.promise;
		},
		//checks to see if the player has named their runepage to the following key
		verifyAccount: function(name, key){
			var p = $q.defer();

			//WHEN 200
			$timeout(function(){
				p.resolve(true);
			})

			return p.promise;
		}
	}
})

.controller("LoginCtrl", ['$scope', '$log', 'LoginMock', function($scope, $log,  Login){
	//form object
	$scope.form = {
		name: "",
		runepageKey: null,
		notFound: null
	}

	//verifies the user name, returns a random generated string for the user to name a runepage as.
	$scope.getRunepageKey = function(){

		Login.getRunepageKey($scope.form.name).then(function(result){
			$scope.form.runepageKey = result;
			$scope.form.notFound = false;
		})
		//when an user is not define
		.catch(function(){
			$log.error("fail");
			$scope.form.runepageKey = null;
			$scope.form.notFound = true;
		})
	};

	$scope.verifyAccount = function(){
		//Login
		Login.verifyAccount($scope.form.name, $scope.form.runepageKey).then(function(result){
			//they are logged in, send them to the home page
			$log.debug("Log in");
		})
		//fails
		.catch(function(){

		})
	}
}])