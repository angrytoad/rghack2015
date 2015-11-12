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
		getRunepageKey: function(name){
			var p = $q.defer();

			//WHEN 200
			// $timeout(function(){
			// 	p.resolve("WXYZ");
			// }, 500);

			//WHEN 400
			$timeout(function(){
				p.reject(false);
			})

			return p.promise;
		}
	}
})
.controller("LoginCtrl", ['$scope', '$log', 'LoginMock', function($scope, $log,  LoginMock){
	//form object
	$scope.form = {
		name: "",
		runepageKey: null,
		notFound: false
	}

	//verifies the user name, returns a random generated string for the user to name a runepage as.
	$scope.getRunepageKey = function(name){

		LoginMock.getRunepageKey(name).then(function(result){
			$scope.form.runepageKey = result;
		})
		//when an user is not define
		.catch(function(){
			$log.error("fail");
			$scope.form.runepageKey = null;
		})
	}
}])