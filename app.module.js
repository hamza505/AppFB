var myApp = angular.module('myApp', ['ui.router', 'ui.bootstrap', 'angular-loading-bar']);
myApp.run(['$rootScope', '$window', 'loginService', function ($rootScope, $window, loginService) {
	console.log('run');
	$rootScope.user = {};
	$rootScope.auth = {};
	$window.fbAsyncInit = function () {
		FB.init({
			appId: '248965872130424',
			status: true,
			xfbml: true,
			cookie: true,
			version: 'v2.6'
		});
	};

	(function (d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) { return; }
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	} (document, 'script', 'facebook-jssdk'));

}]);