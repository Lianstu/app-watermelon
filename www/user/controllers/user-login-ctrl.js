angular
  .module('main.user')
  .controller('LoginCtrl', ['$log', '$ionicHistory', '$scope', '$interval', '$state', '$stateParams', 'ngUser', 'MainService',LoginCtrl])

function LoginCtrl($log, $ionicHistory, $scope, $interval, $state, $stateParams, ngUser, mainService) {
  var self = this;
  self.loginByPassword = loginByPassword;
  ngUser.initJPush2Use();

  $scope.views = {
    mobile: '',
    password: ''
  }

  function loginByPassword() {
    console.log("hello loginByPassword ")
  }
}
