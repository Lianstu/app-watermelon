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
  'main.user'
])
  .config(['LoopBackResourceProvider', function (LoopBackResourceProvider) {
    // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase('https://localhost:3000/api');
  }])
  .run(function($ionicPlatform) {//用来启动你的应用，并且在注射器创建完成之后开始执行
  $ionicPlatform.ready(function() {

  });
})
