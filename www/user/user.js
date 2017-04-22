// Ionic Starter App
angular.module('main.user', [])
  .config(function($stateProvider, $urlRouterProvider) {//利用此方法可以做一些注册工作，这些工作需要在模块加载时完成。
  $stateProvider
    .state('user', {//作为一个虚拟类,或者说是作用域名
    url: '/user',
    abstract: true,
    templateUrl: ''
  })
  .state('user.login', {
    url: '/login',
    controller:"LoginCtrl as ulc",
    templateUrl:"user/templates/login.html"
  })
  .state('user.join', {
    url: '/join',
    controller:"JoinCtrl as ujc",
    templateUrl:"user/templates/join.html"
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/user/login');

  })

  .run(function($ionicPlatform) {//用来启动你的应用，并且在注射器创建完成之后开始执行
    $ionicPlatform.ready(function () {

    })
  })
