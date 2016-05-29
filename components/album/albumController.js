myApp.controller('albumCtrl', ['albumService', '$rootScope', '$http', '$scope', function (albumService, $rootScope, $http, $scope) {

	$scope.albums = [];
	console.log($rootScope.auth);

	albumService.getAlbums().success(function (response) {
		$scope.albums = response.albums.data;
	});

}]);