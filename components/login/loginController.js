myApp.controller('loginCtrl', ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {
    console.log('loginCtrl');
    $scope.btnLoginLabel = "Login with Facebook";
    $scope.test = function() {
        console.log('test');
        if($scope.btnLoginLabel === "Logout") {
        	$scope.btnLoginLabel = "Login with Facebook";
        } else {
	        FB.login(function(response) {
	        	console.log("connect : " + response);
	        	$rootScope.auth = response;
	        	$scope.btnLoginLabel = "Logout";
	        	$state.go('album');
			}, { 
    		scope: 'email, user_photos'
  			});
    	}
    };

}]);