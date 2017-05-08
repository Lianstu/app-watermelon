/**
 * Created by lianshaoshuai on 17/4/25.
 */
// Ionic Starter App
angular.module('main.home', [])
    .config(function($stateProvider, $urlRouterProvider) {//利用此方法可以做一些注册工作，这些工作需要在模块加载时完成。
        $stateProvider
            .state('home', {//作为一个虚拟类,或者说是作用域名
                url: '/home',
                abstract: true,
                templateUrl: ''
            })
            .state('home.home', {
                url: '/home',
                //controller:"LoginCtrl as ulc",
                templateUrl:"home/templates/home.html"
            })
            .state('home.chat', {
                url: '/chat',
                //controller:"LoginCtrl as ulc",
                templateUrl:"home/templates/home.html"
            })
            .state('home.friends', {
                url: '/friends',
                controller:"FriendCtrl as fdc",
                templateUrl:"home/templates/friends.html"
            })
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home/home');
        console.log("come in home")
    })

//.run(function($ionicPlatform) {//用来启动你的应用，并且在注射器创建完成之后开始执行
//  $ionicPlatform.ready(function () {
//
//  })
//})
