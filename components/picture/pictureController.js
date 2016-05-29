myApp.controller('pictureCtrl', ['$scope', '$stateParams', 'albumService', '$http', '$uibModal', function ($scope, $stateParams, albumService, $http, $uibModal) {
	console.log('pictureCtrl');
	console.log($stateParams.albumID);
	$scope.images = [];
	$scope.imagesCpy = [];
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	$scope.totalItems = $scope.imagesCpy.length;
	$scope.ableToSend = false;
	
	albumService.getPictures($stateParams.albumID).success(function (response) {
		console.log(response);
		console.log(JSON.stringify(response));
		$scope.images = response.photos.data;
		$scope.imagesCpy = response.photos.data;
		$scope.pageChanged();
	});

	$scope.add = function (picture) {
		console.log("add");
		console.log(picture.picture);
		console.log(picture.clicked);
		picture.clicked = !picture.clicked;
	};

	$scope.send = function () {
		var pictures = [];
		$scope.ableToSend = true;
		angular.forEach($scope.imagesCpy, function (value, key) {
			if (value.clicked) {
				pictures.push(value.picture);
				value.clicked = false;
			}
			
		});
		$http.post('/api/pictures', pictures).success(function (data) {
			console.log(data);
			$scope.ableToSend = false;
			if (data.status === "OK") {
				var modalInstance = $uibModal.open({
					animation: true,
					templateUrl: 'myModal.html',
					controller: 'ModalInstanceCtrl'
				});
			}
		}).error(function (err) {
			console.log(err);
			$scope.ableToSend = false;
			alert("ERROR !!");
		});
	};

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};

	$scope.pageChanged = function () {
		console.log('pageChanged');
		var begin = (($scope.currentPage - 1) * $scope.pageSize);
		var end = begin + $scope.pageSize;
		$scope.totalItems = $scope.imagesCpy.length;
		$scope.images = $scope.imagesCpy.slice(begin, end);
	};

}]);

myApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {

	$scope.ok = function () {
		$uibModalInstance.close();
	};

});