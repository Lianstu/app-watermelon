/**
 * Created by lianshaoshuai on 17/4/25.
 */
angular.module("main.home")
    .controller("FriendCtrl",["$state",'$scope', 'ngUser', 'MainService', 'User', '$ionicActionSheet','ngHome',FriendCtrl])

function FriendCtrl($state,$scope, ngUser, MainService, User, $ionicActionSheet,ngHome){
    console.log("FriendCtrl")
    $scope.friends = ngHome.friendsall();//获取最近的chats
    $scope.remove = function(friend) {//删除会话
        ngHome.removechat(friend);
    };
}