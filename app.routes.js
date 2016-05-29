myApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('login', {
      url: '/',
      templateUrl: 'components/login/loginView.html',
      controller: 'loginCtrl',
      onEnter: function () {
        console.log("enter login");
      }
    })
    .state('album', {
      url: '/album',
      templateUrl: 'components/album/albumView.html',
      controller: 'albumCtrl'
    })
    .state('picture', {
      url: '/picture/:albumID',
      templateUrl: 'components/picture/pictureView.html',
      controller: 'pictureCtrl'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);