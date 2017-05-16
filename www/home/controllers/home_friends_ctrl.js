/**
 * Created by lianshaoshuai on 17/4/25.
 */
angular.module("main.home")
    .controller("FriendCtrl",["$state",'$scope', 'ngUser', 'MainService', 'User', '$ionicActionSheet','ngHome','PubSub',FriendCtrl])

function FriendCtrl($state,$scope, ngUser, MainService, User, $ionicActionSheet,ngHome,PubSub){
    console.log("FriendCtrl")
    $scope.views = {
        addmessage : "",
        openaddfriendlist :false,
        messages :"",
        isacceptedoption :"",
    }
    function findmyfried (){
        ngHome.findmyfried(function (result) {

        },function(err){

        })
    }
    init()
    function init(){//初始化页面
        // todo 订阅事件;拉取好友列表
        var mobile = ngUser.getUserInfo().mobile
        PubSub.subscribe({
            //TODO 修改collectionName: 'Chat/'+id,(id是好友间定阅的变量值,)
            collectionName: 'Chat/'+mobile,
            method : 'POST'},ChatInit)

    }
    function ChatInit(data){
        console.log("******init*****",data,typeof data)
        if(data){
            $scope.views.addmessage = "+"
        }
        if(data.options){//属于是否同意类
            $scope.views.isacceptedoption = data;
            //被同意后对于添加方拉取好友

        } else{//属于添加好友类
            //todo 将数据放到本地存储中messages;1.页面 views.addmessage 为+号红色提示
            //MainService.setLocalStorage("addmessage",data)

            $scope.views.messages = [data];
        }
    }
    $scope.isaccepted = function(option,mobile){
        console.log("isaccepted_option_mobile",option,mobile)
        if(option == 1){
            option = "1"
        }else{
            option = "2"//不同意
        }
        ngHome.isaccepted(mobile,option,function(result){//正确处理
            console.log("isaccepted",result)
            //接受后访问函数成狗后拉取好友

        },function(err){
            console.log("isaccepted",err)
        })
    }
    $scope.opennewfriend = function(){//new friend 的前端显示和隐藏
        console.log("opennewfriend")
        if($scope.views.openaddfriendlist == true){
            $scope.views.openaddfriendlist = false;
        }else {
            $scope.views.openaddfriendlist = true;
        }
    }
    $scope.friends = ngHome.friendsall();//获取最近的chats
    $scope.remove = function(friend) {//删除会话
        ngHome.removechat(friend);
    };
}