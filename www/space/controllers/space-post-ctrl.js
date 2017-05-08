/**
 * Created by aye on 2017/1/12.
 */
'use strict';
angular
  .module('main.space')
  .controller('PostMyspaceCtrl', ['$log', '$scope', 'ngUser', 'MainService', 'User', '$ionicActionSheet','ngSpace', '$state',PostMyspaceCtrl]);

function PostMyspaceCtrl($log, $scope, ngUser, MainService, User, $ionicActionSheet,ngSpace,$state) {
    $scope.views= {
        mood:""
    }
    $scope.postMyspace = function(){
        var currentUserData = ngUser.getUserInfo();
        var param = {
            createAt: new Date(),
            mycontent:$scope.views.mood,
            up: 0,
            count: 0,
            userId: $scope.views.mobile
        }
        ngSpace.postmyspace(param,function(result){
            if(result){
                $state.go("space.myspace")//跳转到myspace页面
            }
        },function(err){
            console.log("err",err)
        })


    }
}
