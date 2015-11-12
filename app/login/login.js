'use strict';

angular.module("LoginApp", [])
.config(["$routeProvider", function($routeProvider){
	$routeProvider
		.when("/login", {
			templateUrl: "login/login.html",
			controller: "LoginCtrl"
		})
}])
.factory("LoginMock", function($q, $timeout){
	return {
		authenticateUser: function(name){
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
				p.resolve({
					iconId: 511,
					championMasteries: []
				});
			})

			return p.promise;
		}
	}
})
.factory("Login", function($q, $timeout, $http, LoginMock){
	return LoginMock;
	return {
		authenticateUser: function(name){
			var p = $q.defer();

			$http.post("login/login.php", {action: "authenticateUser", name: name})
				//if status 200 
				.success(function(result){
					p.resolve(result);
				})
				//if 400
				.error(function(result){
					p.reject(false);
				})

			return p.promise;
		},
		verifyAccount: function(id, key){
			var p = $q.defer();

			$http.post("login/login.php", {action: "verifyAccount", id: id, runepageString: key})
				.success(function(result){
					p.resolve(true);
				})
				.error(function(){
					p.reject(false);
				})

			return p.promise;;
		}
	}
})
.controller("LoginCtrl", ['$scope', '$log', '$location', 'Login', 'User', function($scope, $log, $location, Login, User){
	//form object
	$scope.form = {
		name: "",
		runepageKey: null,
		notFound: null
	}

	//verifies the user name, returns a random generated string for the user to name a runepage as.
	$scope.authenticateUser = function(){

		Login.authenticateUser($scope.form.name).then(function(result){
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

	$scope.authenticateUserEnter = function(e){
		var key = e.keyCode || e.which;

		if(key === 13 && $scope.form.name.length > 2)
			$scope.authenticateUser();
	}

	$scope.verifyAccount = function(){
		//Login
		Login.verifyAccount($scope.form.name, $scope.form.runepageKey).then(function(result){
			//they are logged in, send them to the home page
			$log.debug("Log in");
			User.user = result;
			$location.url("/lobby");
		})
		//fails
		.catch(function(){

		})
	}
}])