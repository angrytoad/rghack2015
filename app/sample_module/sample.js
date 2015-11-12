'use strict';

angular.module("SampleApp", [])
.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/sample', {
			templateUrl: "sample_module/sample.html",
			controller: "SampleCtrl"
		})
}])
.factory("UserFactory", function($http, $q){
	return {
		getUserLvl: function(){
			//defines promise
			var p = $q.defer();

			$http.post("testResponse.php", {id: 111})
				.success(function(data){
					//commit the response from the server into the promise
					p.resolve(data);
				})

			return p.promise;
		}
	}
})
.controller("SampleCtrl", ['$scope', 'UserFactory', function($scope, UserFactory){
	$scope.test = "DEMACIA!";
	$scope.result = null;
	
	$scope.testResponse = function(){
		
		UserFactory.getUserLvl()
		.then(function(data){
			$scope.result = data; 
		})
	}

}])