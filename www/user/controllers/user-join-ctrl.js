angular
  .module('main.user')
  .controller('JoinCtrl', ['$log', '$ionicHistory', '$scope', '$interval', '$state', '$stateParams', 'ngUser', 'MainService',JoinCtrl])

function JoinCtrl($log, $ionicHistory, $scope, $interval, $state, $stateParams, ngUser, MainService) {
  console.log("hello JoinCtrl ")
  var self = this;
  self.joinByMobile = joinByMobile;
  self.getVerificationCode = getVerificationCode
  //ngUser.initJPush2Use();

  $scope.views = {
    mobile: '',
    password: ''
  }

  function joinByMobile() {
    console.log("hello joinByMobile ")
  }
  function getVerificationCode(){
    console.log("***hello getVerificationCode ")
  }

}
