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
            nickname: currentUserData.nickname
        }
        ngSpace.postmyspace(param,function(result){
            if(result){
                ngSpace.getMyContent (function(res){//获取到数据
                    console.log("SpaceCtrl_getmyspace",res)
                    MainService.setLocalStorage("mycontent",res)
                    $state.go("space.myspace")//跳转到myspace页面
                },function(err){//打印错误
                    console.log("SpaceCtrl_getMyContent_err",err)
                    MainService.alertMsg("获取动态失败")
                })

            }
        },function(err){
            console.log("err",err)
        })
    }
}
