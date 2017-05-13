/**
 * Created by lianshaoshuai on 17/4/27.
 */
angular.module("main.space")
    .controller("MyspaceCtrl",['$log', '$scope', 'ngUser', 'MainService', 'User', '$ionicActionSheet','$cordovaCamera','$state','ngSpace', MyspaceCtrl])
function MyspaceCtrl ($log,$scope,ngUser,MainService,User,$ionicActionSheet,$cordovaCamera,$state,ngSpace) {
    console.log("come in MyspaceCtrl")
    this.sendcomment = sendcomment
    function sendcomment(item){
        console.log( " $scope.datas.item*****",item)
        //console.log( " $scope.datas.item",$scope.datas.item.send_comment)
        var review = {
            creatAt: new Date(),
            comment: item.send_comment,
            nickname:ngUser.getUserInfo().nickname,
            contentId:item.mycontentresult.contentid
        }
        ngSpace.postreview(review,function(res){//正确处理
            MainService.alertMsg("评论成功")
            init();
        },function(err){//错误处理
            MainService.alertMsg("评论失败")
        })
    }
    function getmyspace(){
        console.log("SpaceCtrl")
        ngSpace.getMyContent (function(res){//获取到数据
            console.log("SpaceCtrl_getmyspace",res)
            MainService.setLocalStorage("mycontent",res)
            //$state.go("space.myspace")
        },function(err){//打印错误
            console.log("SpaceCtrl_getMyContent_err",err)
            MainService.alertMsg("获取动态失败")
        })
    }
    function init(){
        getmyspace()
        //$scope.datas= [];
        var result = MainService.getLocalStorage("mycontent");
        result = JSON.parse(result)
        var data = result.result//result就是数据
            //todo 整理好放到数组里面,前端进行ng-repeat进行遍历就好了
        $scope.datas =data;
        //for(var i = 0;i<data.length;i++){
        //    $scope.datas.push(data[i])
        //    console.log(" $scope.views", data[i].mycontentresult.nickname)
        //}
        //console.log(" $scope.views",$scope.views,typeof $scope.views)
    }
    init();
    $scope.onTap = function () {//短按250ms以内
        console.log("onTap")
        setPictureClick();
        function setPicture (){//(sourceType) {
            //navigator -领航员,浏览器的一个独立对象
            $cordovaCamera.getPicture(cameraSuccess, cameraError,
                {
                    quality: 100,
                    //destinationType: camera.DestinationType.DATA_URL,//获取拍照后的图像
                    //sourceType: sourceType,
                    //popoverOptions: new window.CameraPopoverOptions(150, 300, 50, 100, window.Camera.PopoverArrowDirection.ARROW_ANY),
                    targetHeight: 100,
                    targetWidth: 100,
                    allowEdit: true,
                    correctOrientation: true
                }
            );

            function cameraSuccess(imageData) {
                console.log("cameraSuccess")
                $scope.views.avatar = 'data:image/jpeg;base64,' + imageData;
                var currentUserData = ngUser.getUserInfo();
                var params = {};
                params.imgData = $scope.views.avatar;
                AppUser.prototype$editUserImg({id: currentUserData.id}, params, function (result) {
                    MainService.setLocalStorage('currentUserData', JSON.stringify(result));
                }, function (err) {
                    $log.debug('error' + JSON.stringify(err));
                });
            }

            function cameraError(error) {
                $log.debug(JSON.stringify(error));
            }
        }
        // 掉起来相册
        function setPictureClick() {
            $ionicActionSheet.show({
                cssClass: 'ionic-action-tel',
                buttons: [
                    {
                        text: '<a><b>拍照上传</b></a>'
                    },
                    {
                        text: '<a><b>从相册中选择</b></a>'
                    }
                ],
                cancelText: '取消',
                cancel: function () {
                    // 点击取消按钮操作
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        //setPicture()
                        //setPicture(navigator.camera.PictureSourceType.CAMERA);
                    } else if (index === 1) {
                        //setPicture(navigator.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                    setPicture()
                    return true;
                }
            });
        }

    }
    $scope.onHold = function () {//长按超过500ms
        $state.go("space.postmyspace")
    }
}
/**
 * Created by lianshaoshuai on 17/4/27.
 */
