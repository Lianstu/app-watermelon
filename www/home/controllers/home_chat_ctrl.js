/**
 * Created by lianshaoshuai on 17/4/25.
 */
angular.module("main.home")
    .controller("ChatCtrl",["$state",'$scope', 'ngUser', 'MainService', 'User', '$ionicActionSheet','ngHome',ChatCtrl])

function ChatCtrl($state,$scope, ngUser, MainService, User, $ionicActionSheet,ngHome){
    console.log("ChatCtrl")
    //$scope.chat = ngHome.get($stateParams.chatId);
    $scope.chats = ngHome.chatall();//获取最近的chats
    $scope.remove = function(chat) {//删除会话
        ngHome.removechat(chat);
    };
}