myApp.factory('loginService', ['$rootScope', '$q', function ($rootScope, $q) {
	var watchLoginChange = function () {
		console.log('watchLoginChange');
		var _self = this;
		FB.Event.subscribe('auth.authResponseChange', function (res) {
			console.log("subscribe");
			console.log(JSON.stringify(res));
			if (res.status === 'connected') {
				console.log("connected");
				_self.getUserInfo();
			} else {
				console.log("!!connected");
			}
		});
	};
	var getUserInfo = function () {
		console.log('getUserInfo');
		var _self = this;
		FB.api('/me', function (res) {
			$rootScope.$apply(function () {
				$rootScope.user = _self.user = res;
				console.log("USER : " + JSON.stringify($rootScope.user));
			});
		});

	};
	var logout = function () {
		console.log('logout');
		var _self = this;
		FB.logout(function (response) {
			$rootScope.$apply(function () {
				$rootScope.user = _self.user = {};
			});
		});
	};
	var getLoginStatus = function () {
		FB.getLoginStatus(function (response) {
			console.log(JSON.stringify(response));
			if (response.status === 'connected') {
				console.log('connected selon getLoginStatus ');
				var uid = response.authResponse.userID;
				var accessToken = response.authResponse.accessToken;
			} else if (response.status === 'not_authorized') {
				console.log('not authorized => getLoginStatus');
			} else {
				console.log('not connected => getLoginStatus');
			}
        });
	};
	return {
		watchLoginChange: watchLoginChange,
		getUserInfo: getUserInfo,
		getLoginStatus: getLoginStatus,
		getMyLastName: function() {
			console.log('getMyLastName');
            var deferred = $q.defer();
            FB.api('/me', {
                fields: 'last_name'
            }, function(response) {
            	console.log('response');
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
	};
}]);
