/**
 * Created by lianshaoshuai on 17/4/27.
 */
angular.module("main.space")
    .controller("MyspaceCtrl",['$log', '$scope', 'ngUser', 'MainService', 'User', '$ionicActionSheet','$cordovaCamera','$state', MyspaceCtrl])
function MyspaceCtrl ($log,$scope,ngUser,MainService,User,$ionicActionSheet,$cordovaCamera,$state) {
    console.log("MyspaceCtrl")
    //this.publish = publish;
    function init(){
        var result = MainService.getLocalStorage("mycontent");
        $scope.views = {//result就是数据
            //todo 整理好放到数组里面,前端进行ng-repeat进行遍历就好了

        }
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
