/**
 * Created by aye on 2017/1/12.
 */
'use strict';
angular
  .module('main.user')
  .controller('UserInfoCtrl', ['$log', '$scope', 'ngUser', 'MainService', 'User', '$ionicActionSheet','$rootScope', UserInfoCtrl]);

function UserInfoCtrl($log, $scope, ngUser, MainService, User, $ionicActionSheet,$rootScope) {
  this.logout = logout;
  function logout (){
      var appid = ngUser.getUserInfo().lbuserId
      MainService.confirmMsg('提示', '确定退出该账户？', null, function (conf) {
        if (conf) {
          MainService.logout(appid,function () {//退出
            $rootScope.jump('user.login');
          });
        }
      });
    console.log("logout")

  }
  var userInfo = ngUser.getUserInfo();
  console.log("userInfo",userInfo)
  $scope.views = {
    nickname: userInfo.nickname,
    mobile: userInfo.mobile,
    avatar: userInfo.avatar,
    createAt:userInfo.createAt,
    watermelonNo:userInfo.watermelonNo
  };
}

