/**
 * Created by lianshaoshuai on 17/4/25.
 */
angular.module("main.home")
    .controller("AddFriendCtrl",["$state",'$scope', 'ngUser', 'MainService', 'User', '$ionicActionSheet','ngHome',AddFriendCtrl])

function AddFriendCtrl($state,$scope, ngUser, MainService, User, $ionicActionSheet,ngHome){
    var self = this;
    self.searchmobile = searchmobile;
    self.addfriend = addfriend;
    $scope.views = {
        searchmobile:"",
        nickname:"",
        mobile : "",
        message:"",
    }
    /*
     * 用于添加好友
     */
    function addfriend (){
        ngHome.addfriend($scope.views.mobile,$scope.views.message,function(result){
            console.log("ngHome.addfriend",result.sendaddfriendsmes)
            MainService.alertMsg("好友请求已发送")
        },function(err){
            MainService.alertMsg("添加失败")
        })
        console.log("addfriend",$scope.views.message)
        console.log("addfriend",$scope.views.mobile)
    }
    /*
    * 用于搜索用户是否存在,存在则填写认证消息,不存在则提示对应提示
     */
    function searchmobile(mobile){
        console.log("$scope.views.mobile",$scope.mobile,"mobile",mobile)
        ngHome.existfriend(mobile,function(result){//正确处理
            console.log("searchmobile_existfriend",result.isexist.mobile,typeof result.isexist.mobile,typeof result)
            if(result.isexist.mobile){//查找到好友了
                MainService.alertMsg  ("您将添加昵称为"+result.isexist.nickname+"用户为好友")
                $scope.views = {
                    searchmobile:"",
                    nickname:result.isexist.nickname,
                    mobile : result.isexist.mobile
                }
            }else{
                MainService.alertMsg  (result.isexist)
            }
        },function(err){//错误处理

        })
    }
}