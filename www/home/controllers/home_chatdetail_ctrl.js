/**
 * Created by lianshaoshuai on 17/4/25.
 */
angular.module("main.home")
    .controller("ChatDetailCtrl",["$state",'$scope', 'ngUser', 'MainService', 'User', '$ionicActionSheet','ngHome','$stateParams',ChatDetailCtrl])

function ChatDetailCtrl($state,$scope, ngUser, MainService, User, $ionicActionSheet,ngHome,$stateParams){
    console.log("ChatCtrl")
    $scope.chat = ngHome.getchatbyid($stateParams.chatId);
}