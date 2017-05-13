/**
 * Created by lianshaoshuai on 17/4/25.
 */
angular.module("main.home")
    .controller("ChatDetailCtrl",["$state",'$scope', 'ngUser', 'MainService', 'User', '$ionicActionSheet','ngHome','$stateParams','socket','PubSub',ChatDetailCtrl])

function ChatDetailCtrl($state,$scope, ngUser, MainService, User, $ionicActionSheet,ngHome,$stateParams,socket,PubSub){
    console.log("ChatCtrl")
    $scope.messageDetils = ngHome.getchatbyid($stateParams.chatId);
    console.log("chat",$scope.messageDetils)
    var self = this;
    self.sendmessage = sendmessage;
    function  sendmessage(){
        console.log("send message",$scope.send_content)
        $scope.send_content = "";
    }
}