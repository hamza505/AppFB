myApp.factory('albumService', ['$http', '$rootScope', function($http, $rootScope) {
	var getAlbums = function() {
		return $http.get('https://graph.facebook.com/me?fields=albums.fields(id,name,picture,cover_photo,photos.fields(name,picture,source))&access_token='+$rootScope.auth.authResponse.accessToken);
	};

	var getPictures = function(albumID) {
		return $http.get('https://graph.facebook.com/'+ albumID +'?fields=photos.fields(name,picture,source)&access_token='+$rootScope.auth.authResponse.accessToken);
	};

	return {
		getAlbums: getAlbums,
		getPictures: getPictures
	};
}]);