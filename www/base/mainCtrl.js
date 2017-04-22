/**
 * Created by lianshaoshuai on 17/4/21.
 */
angular.module('main')
  .controller('BaseCtrl', [
    '$log',
    '$rootScope',
    '$state',
    '$ionicPlatform',
    '$location',
    '$ionicHistory',
    '$ionicViewSwitcher',
    '$stateParams', BaseCtrl])

function BaseCtrl($log, $rootScope, $state, $ionicPlatform, $location, $ionicHistory, $ionicViewSwitcher, $stateParams){
  /**
   *  跳转页面函数
   *  yelp
   * @param toUrl 路径
   * @param toParams 跳转函数
   */
  $rootScope.jump = function (route, toParams) {
    console.log("$rootScope.jump")
    var params = toParams || {};
    $ionicViewSwitcher.nextDirection('forward');
    $state.go(route, params);
  };

  $rootScope.exit = function () {
    ionic.Platform.exitApp();
  };

  $rootScope.goBack = function (backCount) {
    $ionicViewSwitcher.nextDirection('back');
    if ($ionicHistory.backView()) {
      if (backCount) {
        $ionicHistory.goBack(backCount);
      } else {
        $ionicHistory.goBack();
      }
    } else {
      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $state.go('home');
    }
  };
}

