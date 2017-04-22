angular
  .module('main.user', [])
  .controller('LoginCtrl', ['$log', '$ionicHistory', '$scope', '$interval', '$state', '$stateParams', 'ngUser', 'mainService',userJoinCtrl])

function userJoinCtrl($log, $ionicHistory, $scope, $interval, $state, $stateParams, ngUser, mainService) {
  console.log("hello")
}
