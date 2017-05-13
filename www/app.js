'use strict';
angular.module('Watermelon',[
  // load your modules here
  'main', // starting with the main module
  'lbServices',
  'ngCordova',
  'ionic',
  'ionic.service.core',
  'ionic.service.deploy',
  'main.service',
  'main.user',
  'main.home',
  'main.space'
])
  .config(['$ionicAppProvider', '$ionicConfigProvider', function ($ionicAppProvider, $ionicConfigProvider) {
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('bottom');//默认为left
    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    $ionicConfigProvider.scrolling.jsScrolling(true);
  }])
  .config(['LoopBackResourceProvider', function (LoopBackResourceProvider) {
    // Change the URL where to access the LoopBack REST API server
    //LoopBackResourceProvider.setUrlBase('https://uclean-api.zhinengxiyifang.cn/api')
    LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');
  }])

//Function for unsubscribing..
var unSubscribeAll = function(PubSub){
    //Unsubscribe all listeners..
    PubSub.unSubscribeAll();
}


//.run(['$rootScope', '$ionicDeploy', '$ionicPlatform', '$log', function ($rootScope, $ionicDeploy, $ionicPlatform, $log) {
    //$rootScope.href = window.location.href;
    //$rootScope.showRemainingTime = false;
    //$rootScope.showFrame = false;
    //$rootScope.showSplash = true;
    //$rootScope.showMsg = true;
    //$rootScope.showScanDevice = false;
    //$rootScope.refreshFlag = false;
    //var listenerFunc = function (e) {
    //  $log.debug('document touchmove preventDefault!!!');
    //  e.preventDefault();
    //};
    //document.addEventListener('touchmove', listenerFunc);
    //$ionicPlatform.ready(function () {
    //  console.log("deploy")
    //  if (window.cordova && window.cordova.plugins.Keyboard) {
    //    console.log("deploy")
    //    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //    cordova.plugins.Keyboard.disableScroll(true);
    //
    //  }
    //  if (window.StatusBar) {
    //    console.log("deploy")
    //    // org.apache.cordova.statusbar required
    //    StatusBar.styleDefault();
    //  }
    //  //$rootScope.jump('user.login', {
    //  //  paramNext: ''
    //  //});
    //  console.log("user.login")
    //});
  //}])
  //.run(['$log', '$rootScope', 'User', function ($log, $rootScope, User) {
  //  console.log("deploy $stateChangeStart ")
  //  $rootScope.$on('$stateChangeStart', function (event, toState) {
  //    console.log("deploy $stateChangeStart $on")
  //    $log.debug('stateChangeStart To state: ' + JSON.stringify(toState));
  //    if (toState.authenticate && !User.isAuthenticated()) {
  //      // User isn’t authenticated
  //      if (toState.name === 'home' || toState.name === 'personal' || toState.name === 'user.info' || toState.name === 'user.coupon' || toState.name === 'setting' || toState.name === 'user.info') {
  //        $rootScope.jump('user.login', {
  //          paramNext: toState.name
  //        });
  //      } else {
  //        $rootScope.jump('user.login', {
  //          paramNext: ''
  //        });
  //      }
  //      event.preventDefault();
  //    }
  //
  //  })
  //}]) ;
  //.run(function($ionicPlatform) {//用来启动你的应用，并且在注射器创建完成之后开始执行
  //$ionicPlatform.ready(function() {
  //
  //});
//})
