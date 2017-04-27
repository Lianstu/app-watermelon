/**
 * Created by aye on 2017/1/12.
 */
'use strict';
angular
  .module('main.user')
  .controller('UserInfoCtrl', ['$log', '$scope', 'ngUser', 'MainService', 'User', '$ionicActionSheet', UserInfoCtrl]);

function UserInfoCtrl($log, $scope, ngUser, MainService, User, $ionicActionSheet) {
  this.logout = logout;
  function logout (){
      MainService.confirmMsg('提示', '确定退出该账户？', null, function (conf) {
        if (conf) {
          MainService.logout(function () {//退出
            $rootScope.jump('user.login');
          });
        }
      });
    console.log("logout")

  }
  var userInfo = ngUser.getUserInfo();
  console.log("userInfo",userInfo)
  $scope.views = {
    nickname: userInfo.nickname,
    mobile: userInfo.mobile,
    avatar: userInfo.avatar,
    createAt:userInfo.createAt,
    watermelonNo:userInfo.watermelonNo,
    //setPicture: function (sourceType) {
    //  navigator.camera.getPicture(cameraSuccess, cameraError, {
    //    quality: 100,
    //    destinationType: window.Camera.DestinationType.DATA_URL,
    //    sourceType: sourceType,
    //    popoverOptions: new window.CameraPopoverOptions(150, 300, 50, 100, window.Camera.PopoverArrowDirection.ARROW_ANY),
    //    targetHeight: 100,
    //    targetWidth: 100,
    //    allowEdit: true,
    //    correctOrientation: true
    //  });
    //
    //  function cameraSuccess(imageData) {
    //    $scope.views.avatar = 'data:image/jpeg;base64,' + imageData;
    //    var currentUserData = ngUser.getUserInfo();
    //    var params = {};
    //    params.imgData = $scope.views.avatar;
    //    AppUser.prototype$editUserImg({id: currentUserData.id}, params, function (result) {
    //      MainService.setLocalStorage('currentUserData', JSON.stringify(result));
    //    }, function (err) {
    //      $log.debug('error' + JSON.stringify(err));
    //    });
    //  }

    //  function cameraError(error) {
    //    $log.debug(JSON.stringify(error));
    //  }
    //},
    // 打电话
    //setPictureClick: function () {
    //  $ionicActionSheet.show({
    //    cssClass: 'ionic-action-tel',
    //    buttons: [
    //      {
    //        text: '<a><b>拍照上传</b></a>'
    //      },
    //      {
    //        text: '<a><b>从相册中选择</b></a>'
    //      }
    //    ],
    //    cancelText: '取消',
    //    cancel: function () {
    //      // 点击取消按钮操作
    //    },
    //    buttonClicked: function (index) {
    //      if (index === 0) {
    //        $scope.views.setPicture(window.Camera.PictureSourceType.CAMERA);
    //      } else if (index === 1) {
    //        $scope.views.setPicture(window.Camera.PictureSourceType.PHOTOLIBRARY);
    //      }
    //      return true;
    //    }
    //  });
    //},
  };
}

