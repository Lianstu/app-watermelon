/**
 * Created by lianshaoshuai on 17/4/27.
 */
angular.module("main.space")
    .controller("SpaceCtrl",['$log','$scope','ngUser','MainService','User','$ionicActionSheet','ngSpace',"$state",SpaceCtrl])
function SpaceCtrl ($log,$scope,ngUser,MainService,User,$ionicActionSheet,ngSpace,$state){
    //console.log("SpaceCtrl")
    //var self = this;
    $scope.getmyspace = getmyspace;
    function getmyspace(){
        console.log("SpaceCtrl")
        ngSpace.getMyContent (function(res){//获取到数据
            console.log("SpaceCtrl_getmyspace",res)
            MainService.setLocalStorage("mycontent",res)
            $state.go("space.myspace")
        },function(err){//打印错误
            console.log("SpaceCtrl_getMyContent_err",err)
            MainService.alertMsg("获取动态失败")
        })
    }
}

