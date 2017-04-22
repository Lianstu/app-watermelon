/**
 * Created by aye on 08/02/2017.
 */
'use strict';
angular
  .module('main.user')
  .controller('RestCtrl', ['$log', '$state', '$scope', '$rootScope', '$stateParams', '$ionicHistory', '$interval', 'ngUser', 'MainService', UserRestCtrl]);

function UserRestCtrl ($log, $state, $scope, $rootScope, $stateParams, $ionicHistory, $interval, ngUser, MainService) {
  console.log("hello UserRestCtrl ")
  var self = this;
  self.resetPassword = resetPassword;
  self.getVerificationCode = getVerificationCode;

  var sec = 0,
    countDown = null;

  $scope.views = {
    verificationCodeText: '获取验证码',
    mobile: '',
    verificationCode: '',
    password: '',
    passwdSure: ''
  };

  function resetPassword() {
    console.log("resetPassword")
  }

  function getVerificationCode() {
    console.log("getVerificationCode")
  }
}
