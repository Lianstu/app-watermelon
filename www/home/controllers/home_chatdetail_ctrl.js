/**
 * Created by lianshaoshuai on 17/4/25.
 */
angular.module("main.home")
    .controller("ChatDetailCtrl",["$state",'$scope', 'ngUser', 'MainService', 'User', '$ionicActionSheet','ngHome','$stateParams','socket','PubSub','Chat',ChatDetailCtrl])

function ChatDetailCtrl($state,$scope, ngUser, MainService, User, $ionicActionSheet,ngHome,$stateParams,socket,PubSub){
    console.log("ChatCtrl")
    $scope.messageDetils = ngHome.getchatbyid($stateParams.chatId);
    console.log("chat",$scope.messageDetils)
    var self = this;
    self.sendmessage = sendmessage;
    function  sendmessage(){
        console.log("send message","12345")//$scope.send_content
        ngHome.chatpost("12345",function(result){//{chatContent:$scope.send_content}
            PubSub.subscribe({
                //TODO 修改collectionName: 'Chat/'+id,(id是好友间定阅的变量值,)
                collectionName: 'Chat/'+"12345",
                method : 'POST'},onChatCreate)
        },function(err){

        })
    }
    var onChatCreate = function(data){
        console.log("****ChatDetailCtrl_sendmessage_onChatCreate_data***",data)
        //Logic for callback function on new orders
    }
    //Order.find({}, function(orderList,  httpHeader){
    //        //Success callback
    //        //Subscribe to orders methods here..
    //        PubSub.subscribe({
    //            collectionName: 'Order',
    //            method : 'POST'
    //        }, onOrderCreate);
    //
    //        for(var i=0; i<orderList.length; i++){
    //            PubSub.subscribe({
    //                collectionName: 'Order',
    //                method : 'PUT'
    //                modelId : orderList[i].id
    //            }, onOrderUpdate);
    //
    //            PubSub.subscribe({
    //                collectionName: 'Order',
    //                method : 'DELETE'
    //                modelId : orderList[i].id
    //            }, onOrderDelete);
    //        }
    //
    //    }, //Error
    //    function(httpResp){
    //        console.log(httpResp);
    //    });
    //
    //var onOrderCreate = function(){
    //    //Logic for callback function on new orders
    //}
    //
    //var onOrderUpdate = function(){
    //    //Logic for callback function on updated orders
    //}
    //
    //var onOrderUpdate = function(){
    //    //Logic for callback function on delete orders
    //}
}